const User = require('../models/user')

const fs = require('fs') //* fs is file system
const path = require('path');
const nodemailer = require('../mailer/forgot_password_mailer');
const crypto = require('crypto')

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('_chatBox',{
            title:'Chat App'
        });
    }

    return res.render('sign_up', {
        title: "Chat App | Sign Up"
    })
}

module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password) {
       
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { req.flash('error', err); return }

        if (!user) {
            User.create(req.body, function (err, user) {
               

                return res.redirect('/');
            })
        } else {
          
            return res.redirect('back');
        }

    });

}

module.exports.createSession = async function(req,res){
    
    req.flash('success', 'You have logged in Successfully!');
    return res.redirect('/home2');
}


module.exports.chatBox = function(req,res){
    if(req.isAuthenticated()){
        return res.render('_chatBox',{
            title:'Chat Room'
        })
    }
    
};



module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log('Error In Logged Out !!');
        }
    });

    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}


// //* Forgot Password //*

module.exports.forgotPassword = function (req, res) {
    return res.render('forgot_password', {
        title: 'Forgot PassWord'
    });
}
module.exports.forgot = async function (req, res) {
    const email = req.body.email;

    try {
        // Check if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate and save reset token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Send reset password email
        await nodemailer.forgotPassword(email, token);

        req.flash('success', 'Email Sent SuccessFully !');

        return res.redirect('back');

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports.updatePassword = function (req, res) {
    return res.render('reset_password', {
        title: 'Reset Password'
    })
}
module.exports.resetPassword = async (req, res) => {


    console.log('Body', req.body);

    const token = req.body.resetToken;
    console.log(token);
    const { password } = req.body;
    const { confirm_password } = req.body;

    try {
        // first check Entered Both Password Match Or Not
        if (password != confirm_password) {
            console.log(`Please Enter Same Password`);
            req.flash('error', 'Please Enter Same Password !!');
            return res.redirect('back');
        }
        // Find user by token and check token expiration
        const user = await User.findOne(
            { resetToken: token }

        )
        console.log('User::', user);

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Update user password
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save();
        console.log('User After Save ::', user);

        return res.render('home', {
            title: 'Chat || App'
        })
    } catch (error) {
        console.error('Reset password error:', error);
        return;
    }
};


