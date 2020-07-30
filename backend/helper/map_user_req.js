module.exports = function (user, userDetails) {
  if (userDetails.name) user.name = userDetails.name;
  if (userDetails.username) user.username = userDetails.username;
  if (userDetails.password) user.password = userDetails.password;
  if (userDetails.email) user.email = userDetails.email;
  if (userDetails.dob) user.dob = userDetails.dob;
  if (userDetails.gender) user.gender = userDetails.gender;
  if (userDetails.phoneNumber) user.phoneNumber = userDetails.phoneNumber;
  if (userDetails.status) user.status = true;
  if (userDetails.inActiveStatus) user.status = false;
  if (userDetails.role) user.role = userDetails.role;
  if (userDetails.image) user.image = userDetails.image;
  if (userDetails.permanent_address || userDetails.temp_address) {
    if (!user.address) {
      user.address = {};
    }
    if (userDetails.permanent_address)
      user.address.permanent_address = userDetails.permanent_address;
    if (userDetails.temp_address)
      user.address.temp_address = userDetails.temp_address.split(",");
  }
  return user;
};
