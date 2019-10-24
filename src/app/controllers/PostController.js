import * as Yup from 'yup';

import Post from '../models/Post';
import User from '../models/User';

class PostController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const posts = await Post.findAll({
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
}

export default new PostController();
