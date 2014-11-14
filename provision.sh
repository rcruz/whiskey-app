# mysql setup
sudo apt-get update
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password strongpw'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password strongpw'
sudo apt-get -y install mysql-server

# node setup
sudo npm install -g grunt-cli
cd /vagrant/api && npm install

