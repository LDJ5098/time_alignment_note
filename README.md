    ServerAdmin webmaster@localhost
    DocumentRoot /root/etc/download/timeset
    ServerName 192.197.111.100

    <Directory "/root/etc/download/timeset">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
