<?php


    defined('SITE_ROOT') ? null : define('SITE_ROOT', '/xampp/htdocs/iSmart');
    defined('INC_PATH') ? null  : define('INC_PATH', SITE_ROOT . '/includes');
    defined('CORE_PATH') ? null : define('CORE_PATH', SITE_ROOT . '/core');

    require_once(INC_PATH . "/config.php");

    require_once("user_entity.php");

    require_once("feature_entity.php");

    require_once("role_entity.php");

    require_once("product_entity.php");

    require_once("category_entity.php");

    require_once("stock_entity.php");

    require_once("invoice_entity.php");

    require_once("password_entity.php");

    require_once("dashboard_entity.php");

?>