export const login = async (req, res) => {
  try {
    res.status(200).send("User logged in");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
