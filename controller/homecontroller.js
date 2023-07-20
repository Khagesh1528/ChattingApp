const User = require('../models/user');

module.exports.home = (req,res)=>{
    // if (req.isAuthenticated()) {
    //     return res.redirect('/users/profile');
    // }

    return res.render('home',{
        title:'Home'
    })
}
module.exports.home2 = async (req, res) => {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/users/profile');
    // }

    try {
        let users =  await User.find({});

        return res.render('home2', {
            title: 'Chat App || Home',
            all_users: users
        })
        
    } catch (err) {
        console.log('Error In Hom2',err);
        return res.redirect('back')
    }
}

