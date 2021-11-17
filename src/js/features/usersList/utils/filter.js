export function matchSearch(usersList, input) {
  return usersList.filter(data => {
    const { name, location, email, phone } = data;
    return (name.first + name.last).includes(input) ||
      // (location.street + location.city + location.state).includes(input) ||
      email.includes(input) ||
      phone.includes(input);
  })
}