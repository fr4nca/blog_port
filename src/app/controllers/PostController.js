import * as Yup from 'yup';

import Post from '../models/Post';
import User from '../models/User';

class PostController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const posts = await Post.findAll({
      where: {
        deleted: false,
      },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'title', 'body', 'created_at'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(posts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      body: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    try {
      const post = await Post.create({
        ...req.body,
        author_id: req.userId,
      });

      return res.json(post);
    } catch (e) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async retrieve(req, res) {
    const post = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'body', 'created_at', 'deleted'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!post) {
      return res
        .status(400)
        .json({ error: 'Post with id provided does not exists.' });
    }

    return res.json(post);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      body: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const post = await Post.findByPk(req.params.id);

    if (post.author_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to update this post.",
      });
    }

    const { id, title, body, deleted, author_id } = await post.update(req.body);

    return res.json({ id, title, body, deleted, author_id });
  }

  async delete(req, res) {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email'],
        },
      ],
      attributes: ['id', 'title', 'body', 'deleted'],
    });

    if (post.author.id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to delete this post.",
      });
    }

    post.deleted = true;

    await post.save();

    return res.json(post);
  }
}

export default new PostController();
