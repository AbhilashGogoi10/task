const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.userregister = async (req, res) => {
  const {
    fname,
    email,
    password,
    address,
    occupation,
    contact,
    dateOfBirth,
    gender,
  } = req.body;

  if (
    !fname ||
    !email ||
    !password ||
    !address ||
    !occupation ||
    !contact ||
    !dateOfBirth ||
    !gender
  ) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const presuer = await users.findOne({ email: email });

    if (presuer) {
      res.status(400).json({ error: "This User Allready exist in our db" });

      // successful registration email
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For Successful Registration and Email Verification",
        text: "Congratulation, You have successfully registered to USER MANAGER ! Cick here to verify your email : http://localhost:3000/emailVerification",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(400).json({ error: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res.status(200).json({ message: "Email sent Successfully" });
        }
      });
    } else {
      const userregister = new users({
        fname,
        email,
        password,
        address,
        occupation,
        contact,
        dateOfBirth,
        gender,
      });

      const storeData = await userregister.save();

      // successful registration email
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For Successful Registration and Email Verification",
        text: "Congratulations, You have successfully registered to USER MANAGER ! Cick here to verify your email : http://localhost:3000/emailVerification"
        ,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(400).json({ error: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res.status(200).json({ message: "Email sent Successfully" });
        }
      });

      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

// user send otp
exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const presuer = await users.findOne({ email: email });

    if (presuer) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await userotp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation",
          text: `OTP: ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new userotp({
          email,
          otp: OTP,
        });

        await saveOtpData.save();
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation",
          text: `OTP: ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "This User doesn't Exist In our Db" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    res.status(400).json({ error: "Please Enter Your OTP and email" });
  }

  try {
    const otpverification = await userotp.findOne({ email: email });

    if (otpverification.otp === otp) {
      const preuser = await users.findOne({ email: email });

      // token generate
      const token = await preuser.generateAuthtoken();
      res.status(200).json({ user: preuser, userToken: token });
    } else {
      res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};
