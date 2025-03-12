const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists by email
    
    const checkDatabaseCreation = async () => {
      const testUser = await User.findOne();
      if (!testUser) {
        console.log("No users found, inserting test user...");
        await new User({ username: "Test", email: "test@test.com", password: "test" }).save();
      }
    };
    checkDatabaseCreation();
   
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email is already in use",
      });
    }

    const hashPassword = await bcrypt.hash(String(password), 12);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Registration Successful",
      user: { email, password }
      
    });
  } catch (e) {
    console.error("Error during registration:", e); // Log the actual error
    res.status(500).json({
      success: false,
      message: e.message || "Some error occurred",
    });
  }
};

const getRegister = async (req, res) => {
  res.send("Hello from server");
};

//login

const loginUser = async (req, res) => {
  try {
    const { email, password, userName} = req.body;
    console.log("req body in login", req.body)
   
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.json({
        success: false,
        message: "User doesn't exists with this email, Please Register first",
      });

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword)
      return res.json({
        success: false,
        message: "Incorrect password!, Please try again",
      });

    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email, 
        userName : existingUser.username
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie('token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Loggined in successfully",
      user: {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id,
        userName : existingUser.username
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
      error: error.message
    });
  }
};

//logout

const logoutUser = ( req, res )=> {
    res.clearCookie('token').status(200).json({
        success: true,
        message: "Loggout out successfully"
    })
}

// check_auth middleware

const authMiddleware = async ( req, res, next )=> {
    const token = req.cookies.token;

    if(!token)  return res.status(401).json({
        success: false,
        message: "Unauthorized user!"
    })

    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY")
        req.user = decoded;
        next();
        

    } catch (error) {
        return res.json({
        success: false,
        message: "Unauthorized user!"
    })
}

} 

module.exports = { getRegister, registerUser, loginUser, logoutUser, authMiddleware};
