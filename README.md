    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html

    <Directory /var/www/html/time_alignment_note>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined