import config from './config/index.js' 
import app from './express.js'
app.get("/", (req, res) => {
res.json({ message: "Welcome to DressStore application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})
