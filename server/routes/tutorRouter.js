// const express = require("express");
// const bcrypt = require("bcryptjs");
// const Tutor = require("../models/Tutor");
// const authMiddleware = require("../middlewares/authMiddleware");
// const authorize = require("../middlewares/authorize")

// const router = express.Router();

// /**
//  * GET /tutors
//  * Get all tutors
//  */
// router.get("/", async (req, res) => {
//   try {
//     const tutors = await Tutor.find().select("-password");

//     res.status(200).json({
//       success: true,
//       count: tutors.length,
//       tutors,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// /**
//  * GET /tutors/:id
//  * Get tutor by id
//  */
// router.get("/:id", async (req, res) => {
//   try {
//     const tutor = await Tutor.findById(req.params.id).select("-password");

//     if (!tutor) {
//       return res.status(404).json({
//         success: false,
//         message: "Tutor not found",
//       });
//     }

//     res.json({
//       success: true,
//       tutor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// /**
//  * POST /tutors
//  * Create tutor
//  */
// router.post("/", authorize("admin"), async (req, res) => {
//   try {
//     const existingTutor = await Tutor.findOne({
//       email: req.body.email,
//     });

//     if (existingTutor) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     const tutor = await Tutor.create(req.body);

//     res.status(201).json({
//       success: true,
//       tutor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// /**
//  * PUT /tutors/:id
//  * Update tutor
//  */
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     // Hash password if updating it
//     if (updateData.password) {
//       const salt = await bcrypt.genSalt(10);
//       updateData.password = await bcrypt.hash(updateData.password, salt);
//     }

//     const tutor = await Tutor.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     if (!tutor) {
//       return res.status(404).json({
//         success: false,
//         message: "Tutor not found",
//       });
//     }

//     res.json({
//       success: true,
//       tutor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// /**
//  * DELETE /tutors/:id
//  * Delete tutor
//  */
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const tutor = await Tutor.findByIdAndDelete(req.params.id);

//     if (!tutor) {
//       return res.status(404).json({
//         success: false,
//         message: "Tutor not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Tutor deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const Tutor = require("../models/Tutor");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

const router = express.Router();

/**
 * GET /tutors
 * Get all tutors — public, no auth needed
 */
router.get("/", async (req, res) => {
  try {
    const tutors = await Tutor.find().select("-password");
    res.status(200).json({
      success: true,
      count: tutors.length,
      tutors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /tutors/:id
 * Get single tutor — public
 */
router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id).select("-password");
    if (!tutor) {
      return res
        .status(404)
        .json({ success: false, message: "Tutor not found" });
    }
    res.json({ success: true, tutor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /tutors
 * Create tutor — admin only
 * FIXED: added authMiddleware BEFORE authorize
 */
router.post(
  "/",
  authMiddleware, authorize("admin"),
  async (req, res) => {
    try {
      if (req.body.email && req.body.email.trim()) {
        const existingTutor = await Tutor.findOne({ email: req.body.email.trim() });
        if (existingTutor) {
          return res
            .status(400)
            .json({ success: false, message: "Email already exists" });
        }
      }

      const tutor = await Tutor.create(req.body);
      res.status(201).json({ success: true, tutor });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

/**
 * PUT /tutors/:id
 * Update tutor — admin only
 */
router.put("/:id", authMiddleware, authorize("admin"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const tutor = await Tutor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!tutor) {
      return res
        .status(404)
        .json({ success: false, message: "Tutor not found" });
    }

    res.json({ success: true, tutor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * DELETE /tutors/:id
 * Delete tutor — admin only
 */
router.delete("/:id", authMiddleware, authorize("admin"), async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) {
      return res
        .status(404)
        .json({ success: false, message: "Tutor not found" });
    }
    res.json({ success: true, message: "Tutor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
