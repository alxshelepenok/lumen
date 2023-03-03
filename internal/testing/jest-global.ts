module.exports = async () => {
  // snapshot tests depend on a timezone
  process.env.TZ = "Europe/London";
}