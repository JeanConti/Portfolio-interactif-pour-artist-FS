// => Rendered HTML string
let template = ejs.compile(str, options);
template(data);

// => Rendered HTML string
ejs.render(str, data, options);

ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string
});