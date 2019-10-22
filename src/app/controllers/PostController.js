import Post from '../models/Post';
import * as Yup from 'yup';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      body: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const post = await Post.create({
      ...req.body,
      author_id: req.userId,
    });

    return res.json(post);
  }
}

export default new PostController();
