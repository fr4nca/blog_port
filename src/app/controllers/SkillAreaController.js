import * as Yup from 'yup';
import SkillArea from '../models/SkillArea';

class SkillAreaController {
  async index(req, res) {
    const areas = await SkillArea.findAll({
      order: ['id'],
    });

    return res.json(areas);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id, title } = await SkillArea.create(req.body);

    return res.json({ id, title });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id: pk } = req.params;

    const area = await SkillArea.findByPk(pk);

    if (!area) {
      return res
        .status(400)
        .json({ error: 'Area with id provided does not exists.' });
    }

    const { id, title } = await area.update(req.body);

    return res.json({ id, title });
  }
}

export default new SkillAreaController();
