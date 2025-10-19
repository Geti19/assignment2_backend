import createError from "http-errors";
import Project from "../models/Project.js";

export async function getAll(req, res, next) {
  try { res.json(await Project.find()); }
  catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) throw createError(404, "Project not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function createOne(req, res, next) {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (e) { next(e); }
}

export async function updateById(req, res, next) {
  try {
    const doc = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) throw createError(404, "Project not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function removeById(req, res, next) {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id);
    if (!doc) throw createError(404, "Project not found");
    res.json({ deleted: true, id: doc._id });
  } catch (e) { next(e); }
}

export async function removeAll(req, res, next) {
  try {
    const r = await Project.deleteMany({});
    res.json({ deletedCount: r.deletedCount });
  } catch (e) { next(e); }
}
