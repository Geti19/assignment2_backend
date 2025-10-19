import createError from "http-errors";
import User from "../models/User.js";

export async function getAll(req, res, next) {
  try { res.json(await User.find()); }
  catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const doc = await User.findById(req.params.id);
    if (!doc) throw createError(404, "User not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function createOne(req, res, next) {
  try { res.status(201).json(await User.create(req.body)); }
  catch (e) { next(e); }
}

export async function updateById(req, res, next) {
  try {
    const payload = { ...req.body, updated: new Date() };
    const doc = await User.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!doc) throw createError(404, "User not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function removeById(req, res, next) {
  try {
    const doc = await User.findByIdAndDelete(req.params.id);
    if (!doc) throw createError(404, "User not found");
    res.json({ deleted: true, id: doc._id });
  } catch (e) { next(e); }
}

export async function removeAll(req, res, next) {
  try {
    const r = await User.deleteMany({});
    res.json({ deletedCount: r.deletedCount });
  } catch (e) { next(e); }
}
