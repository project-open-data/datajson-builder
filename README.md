datajson-builder
================

## Description

This Jekyll projects provides an easy to manage and fast method for generating a data.json file from YAML files.  

See [Project Open Data](https://project-open-data.cio.gov/) for more information on the [data.json schema](https://project-open-data.cio.gov/v1.1/schema/).

This project is only an `alpha` prototype and is not ready for production, yet.

## Installation

No installation is required to add new datasets or modify existing datasets.

If you want to decompile an existing data.json into YAML/Markdown posts, then you'll need to install NPM.  Installation instructions for a development build are below.

```
sudo apt-get install nginx
sudo mkdir /var/www
sudo chown -R vagrant:vagrant /var/www
# Edit /etc/nginx/sites-availble/default to listen to :8000 and point to /var/www
sudo /etc/init.d/nginx restart
###############
sudo su -
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
source /usr/local/rvm/scripts/rvm
rvm get stable
rvm list known
rvm install ruby-2.0.0-p353
rvm --default use ruby-2.0.0-p353
gem install jekyll
###############
sudo apt-get install npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
cd ~/datajson-builder
npm install
sudo npm install -g gulp
###############
gulp
```

## Usage

The Jekyll template will automatically build the data.json file.  If not using GitHub pages, run `jekyll build` locally.

To decompile an existing data.json file, such as [http://state.gov/data.json](http://state.gov/data.json), run the following from the root directory:

```Shell
./decompile_datajson.js --dest DEST --file FILE
./decompile_datajson.js --dest DEST --url URL
```

For example:

```Shell
./decompile_datajson.js --dest '_posts/external' --file 'data.json'
./decompile_datajson.js --dest '_posts/external' --url 'http://state.gov/data.json'
```

If combining an external data.json and a locally managed data.json, it's a good idea to decompile the external data.json into a distinct folder, such as `_posts/external`.

## Contributing

Pull requests are welcome.  The code for this project is available on GitHub at [https://github.com/project-open-data/datajson-builder](https://github.com/project-open-data/datajson-builder).

## LICENSE

This project constitutes a work of the United States Government and is not subject to domestic copyright protection under 17 USC § 105.

However, because the project utilizes code licensed from contributors and other third parties, it therefore is licensed under the MIT License. http://opensource.org/licenses/mit-license.php. Under that license, permission is granted free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the conditions that any appropriate copyright notices and this permission notice are included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

