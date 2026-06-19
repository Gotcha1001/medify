export function formatApiError(error) {
  if (error instanceof Error) return error.message;
  if (error?.response?.data) {
    return typeof error.response.data === "string"
      ? error.response.data
      : JSON.stringify(error.response.data);
  }
  return String(error);
}

export const callWithDoctor = {
  doctor: {
    select: {
      name: true,
      slug: true,
      specialty: true,
      avatarUrl: true,
    },
  },
};
