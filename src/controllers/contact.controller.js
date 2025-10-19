import createError from "http-errors";
import Contact from "../models/Contact.js";

export async function getAll(req, res, next) {
  try { res.json(await Contact.find()); }
  catch (e) { next(e); }
}

export async function getById(req, res, next) {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc) throw createError(404, "Contact not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function createOne(req, res, next) {
  try { res.status(201).json(await Contact.create(req.body)); }
  catch (e) { next(e); }
}

export async function updateById(req, res, next) {
  try {
    const doc = await Contact.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!doc) throw createError(404, "Contact not found");
    res.json(doc);
  } catch (e) { next(e); }
}

export async function removeById(req, res, next) {
  try {
    const doc = await Contact.findByIdAndDelete(req.params.id);
    if (!doc) throw createError(404, "Contact not found");
    res.json({ deleted: true, id: doc._id });
  } catch (e) { next(e); }
}

export async function removeAll(req, res, next) {
  try {
    const r = await Contact.deleteMany({});
    res.json({ deletedCount: r.deletedCount });
  } catch (e) { next(e); }
}
