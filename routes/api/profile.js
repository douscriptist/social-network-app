const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get Current User's Profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    // If there is not a profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user!' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or Update User Profile
// @access  Private
router.post('/', [
  auth,
  check('status', 'Status is required!').notEmpty(),
  check('skills', 'Skills is required!').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubUsername) profileFields.githubUsername = githubUsername;
  // FIX:
  // LATER:
  if (skills) {
    if(typeof skills != "object") profileFields.skills = skills.split(',').map(skill => skill.trim());
    else profileFields.skills = skills;
  }
    // profileFields.skills = skills.split(',').map(skill => skill.trim());

  // Build Social Object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  // So Update and Insert Data
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // If there is profile then Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create 
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile
// @desc    Get All Profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message());
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:userId
// @desc    Get profile by User Id
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // TODO: Remove  users posts
    // LATER: Not remove forever set status?
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User removed!' });
  } catch (err) {
    console.error(err.message());
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [
  auth,
  check('title', 'Title is required!').notEmpty(),
  check('company', 'Company is required!').notEmpty(),
  check('from', 'From Date is required!').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    profile.experience.unshift(newExperience);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/experience/:expId
// @desc    Delete profile experience from Profile by id
// @access  Private
router.delete('/experience/:expId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    // const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.expId);
    // profile.experience.splice(removeIndex, 1);

    profile.experience = profile.experience.filter(exp => exp._id != req.params.expId);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [
  auth,
  check('school', 'School is required!').notEmpty(),
  check('degree', 'Degree is required!').notEmpty(),
  check('fieldOfStudy', 'Field of Study is required!').notEmpty(),
  check('from', 'From Date is required!').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEducation = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  };
  
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    profile.education.unshift(newEducation);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/education/:eduId
// @desc    Delete profile education from Profile by id
// @access  Private
router.delete('/education/:eduId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter(edu => edu._id != req.params.eduId);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=10&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    }

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Github user not found!' });
      }

      res.json(JSON.parse(body));
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


module.exports = router;