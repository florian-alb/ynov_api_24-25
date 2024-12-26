import {
  add,
  getActive,
  getAll,
  getById,
  update,
  deleteById,
} from "../services/signature.service";

export const getSignatures = async (req: any, res: any) => {
  const signatures = await getAll(req.user.id);
  res.json({
    success: true,
    data: signatures,
  });
};

export const getSignatureById = async (req: any, res: any) => {
  const signature = await getById(req.user.id, req.params.id);

  if (!signature) {
    return res.status(404).json({
      success: false,
      message: "Signature not found",
    });
  }

  res.json({
    success: true,
    data: signature,
  });
};

export const getActiveSignature = async (req: any, res: any) => {
  const signature = await getActive(req.user.id);

  if (!signature) {
    return res.status(404).json({
      success: false,
      message: "Active signature not found",
    });
  }

  res.json({
    success: true,
    data: signature,
  });
};

export const addSignature = async (req: any, res: any) => {
  const signature = await add(req.user.id, req.body);
  res.status(201).json({
    success: true,
    data: signature,
  });
};

export const updateSignature = async (req: any, res: any) => {
  const signature = await update(req.user.id, req.params.id, req.body);

  if (!signature) {
    return res.status(404).json({
      success: false,
      message: "Signature not found",
    });
  }

  res.json({
    success: true,
    data: signature,
  });
};

export const deleteSignature = async (req: any, res: any) => {
  const hasBeenDeleted = await deleteById(req.user.id, req.params.id);
  if (!hasBeenDeleted) {
    return res.status(404).json({
      success: false,
      message: "Signature not found",
    });
  }

  return res.status(204).json({
    success: true,
    message: "Signature deleted",
  });
};
