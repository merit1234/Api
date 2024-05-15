

function signOutController (req,res){
    res.clearCookie('token');
    res.send('Logged out successfully');
    return;
}
module.exports = {signOutController};