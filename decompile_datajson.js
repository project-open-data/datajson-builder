#!/usr/bin/env node
var yargs = require('yargs');
var fs = require('fs');
var pkg = require('./package.json');
var request = require('request');

var slugify = function(a)
{
    //return "0100-01-01-"+a.replace(/,/g, '_');
    return "0100-01-01-"+a;
};


var esc = function(a)
{
    return a.replace(/"/g, '\\"');
};


var json_to_md = function(dest, index, json) {
    var path = dest+"/"+slugify(json.identifier)+".md";
    var md = "";
    if(json.identifier == "100,765")
    {
        //md += JSON.stringify(json)
    }
    md += "---\n";
    md += "layout: wrapper_text\n";
    md += "category: datasets\n";
    md += "\n";
    md += "# Basic\n";
    md += "identifier: \""+json.identifier+"\"\n";
    md += "title: \""+json.title+"\"\n";
    md += "describedBy: \""+(json["describedBy"]||"")+"\"\n";
    md += "description: \""+esc(json.description)+"\"\n";
    md += "programCode:\n";
    md += "  - \""+json.programCode[0]+"\"\n";
    md += "bureauCode:\n";
    md += "  - \""+json.bureauCode[0]+"\"\n";
    md += "\n";
    md += "# Dates\n";
    md += "modified: \""+json.modified+"\"\n";
    md += "\n";
    md += "# POC\n";
    md += "poc:\n";
    md += "  type: \""+json.contactPoint["@type"]+"\"\n";
    md += "  fn: \""+json.contactPoint.fn+"\"\n";
    md += "  hasEmail: \""+json.contactPoint.hasEmail+"\"\n";
    md += "\n";
    md += "# Publisher\n";
    md += "publisher:\n";
    md += "  type: \""+json.publisher["@type"]+"\"\n";
    md += "  name: \""+json.publisher.name+"\"\n";
    md += "\n";
    md += "# Spatiotemporal\n";
    md += "spatial: \""+json.spatial+"\"\n";
    md += "temporal: \""+json.temporal+"\"\n";
    md += "\n";
    md += "# Distribution\n";
    md += "distribution:\n";
    for(var i = 0; i < json.distribution.length; i++)
    {
        var d = json.distribution[i];
        md += "  - type: \""+d["@type"]+"\"\n";
        if(d["accessURL"] !== undefined)
            md += "    accessURL: \""+d["accessURL"]+"\"\n";
        if(d["downloadURL"] !== undefined)
            md += "    downloadURL: \""+d["downloadURL"]+"\"\n";
        if(d["mediaType"] !== undefined)
            md += "    mediaType: \""+d["mediaType"]+"\"\n";
        if(d["format"] !== undefined)
            md += "    format: \""+d["format"]+"\"\n";
    }
    md += "\n";
    md += "# Keywords\n";
    md += "keyword:\n";
    for(var i = 0; i < json.keyword.length; i++)
    {
        var kw = json.keyword[i];
        md += "  - \""+kw+"\"\n";
    }
    md += "---";
    fs.writeFile(path, md, function(err) {});
};

var decompile = function () {
    var argv = yargs.usage('Usage: $0 decompile_datajson --dest [dest] --file [file] --url [url]').demand(['dest']).argv;
    var dest = argv.dest;
    var file = argv.file;
    var url = argv.url;
    if(dest !== undefined && file != undefined)
    {
        fs.readFile(file, 'utf8', function(error, data) {
            if (!error) {
                var datajson = JSON.parse(data);
                if(datajson.dataset !== undefined)
                {
                    for(var i = 0; i < datajson.dataset.length; i++)
                    {
                        var dataset = datajson.dataset[i];
                        json_to_md(dest, i, dataset);
                    }
                }
            }
        });
    }
    else if(dest !== undefined && url !== undefined)
    {
        process.stdout.write(url+"\n");
        process.stdout.write("Processing url\n");
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var datajson = JSON.parse(body);
                if(datajson.dataset !== undefined)
                {
                    for(var i = 0; i < datajson.dataset.length; i++)
                    {
                        var dataset = datajson.dataset[i];
                        json_to_md(dest, i, dataset);
                    }
                }
            }
        });
    }
    else
    {
        process.stdout.write("You need to specify file or url.");
    }
};

decompile();
