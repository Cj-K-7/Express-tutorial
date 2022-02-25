const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const data = [
  { id: 1, name: "cj", email: "asdsad@ASdas.asdk" },
  { id: 2, name: "aisdk", email: "sdkadm@ansd.com" },
];

// Get json
router.get("/", (req, res) => {
  res.json(data);
});

// Get Single member
router.get("/:id", (req, res) => {
  const found = data.some((a) => a.id === parseInt(req.params.id));
  if (found) {
    res.json(data.filter((a) => a.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "data not found" });
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  data.push(newMember);
  res.json(data);
});

// Update Memver
router.put("/:id", (req, res) => {
  const found = data.some((a) => a.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    data.forEach((a) => {
      if (a.id == parseInt(req.params.id)) {
        data.name = updMember.name ? req.body.name : data.name;
        data.email = updMember.email ? req.body.email : data.email;

        res.json({ msg: "updated", data });
      }
    });
  } else {
    res.status(400).json({ msg: "data not found" });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = data.some((a) => a.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "member deleted",
      data: data.filter((a) => a.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: "data not found" });
  }
});

module.exports = router;
