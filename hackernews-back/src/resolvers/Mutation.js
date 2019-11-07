// post = (root, args, context) => {
//   return context.prisma.createLink({
//     url: args.url,
//     description: args.description
//   })
// }


let signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  }
}

let login = async (parent, args, context, info) => {
  const user = await 
}

module.exports = {
  post
}