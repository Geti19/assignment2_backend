import createError from "http-errors";
import Service from "../models/Service.js";

export async function getAll(req, res, next) {
  try { res.json(await Service.find()); }
  catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const doc = await Service.findById(req.params.id);
    if (!doc) throw createError(404, "Service not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function createOne(req, res, next) {
  try { res.status(201).json(await Service.create(req.body)); }
  catch (e) { next(e); }
}

export async function updateById(req, res, next) {
  try {
    const doc = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) throw createError(404, "Service not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function removeById(req, res, next) {
  try {
    const doc = await Service.findByIdAndDelete(req.params.id);
    if (!doc) throw createError(404, "Service not found");
    res.json({ deleted: true, id: doc._id });
  } catch (e) { next(e); }
}

export async function removeAll(req, res, next) {
  try {
    const r = await Service.deleteMany({});
    res.json({ deletedCount: r.deletedCount });
  } catch (e) { next(e); }
}
