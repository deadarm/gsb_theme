<?php

/**
 * @file
 * Default theme implementation to display an error page.
 */
?>

  <div id="page-wrapper"><div id="page">
    <div id="header-wrapper"><div id="header"><div class="section clearfix">
      <a id="search-touch-button"></a>

      <?php if ($page['navigation']): ?>
        <div id="nav-touch-wrapper">
          <a id="nav-touch-button"></a>
          <div id="navigation"><div class="section">
            <?php print render($page['navigation']); ?>
            <?php print render($event_and_search); ?>
            <div id="menu-main-footer">
              <?php
                $footer_1 = module_invoke('menu', 'block_view', 'menu-footer-1');
                $footer_2 = module_invoke('menu', 'block_view', 'menu-footer-2');
                print render($footer_1['content']);
                print render($footer_2['content']);
              ?>
            </div>
          </div></div> <!-- /.section, /#navigation -->
        </div> <!-- /#nav-touch-wrapper-->
      <?php endif; ?>

      <?php if ($site_slogan): ?>
        <div id="site-slogan"><?php print $site_slogan; ?></div>
      <?php endif; ?>

      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo">
          <img src="/<?php print drupal_get_path('theme', 'gsb_theme'); ?>/images/logo-print.jpg" alt="Home">
        </a>
      <?php endif; ?>

      <?php if ($page['header']): ?>
        <?php print render($page['header']); ?>
      <?php endif; ?>

    </div></div></div> <!-- /.section, /#header, /#header-wrapper -->

    <?php print $messages; ?>


    <div id="content-wrapper" class="clearfix">

      <div id="content" class="clearfix">

        <div id="main" class="column"><div class="section">
          <?php if ($page['highlighted']): ?><div id="highlighted"><?php print render($page['highlighted']); ?></div><?php endif; ?>
          <a id="main-content"></a>
          <?php if (!isset($page['banner']['gsb_public_custom_blocks_gpcb_breadcrumbs'])): ?>
          <?php print $breadcrumb; ?>
          <?php endif; ?>
          <?php print render($title_prefix); ?>
          <?php if ($title): ?><span class="title-wrapper"><h1 class="title" id="page-title"><?php print $title; ?></h1></span><?php endif; ?>
          <?php print render($title_suffix); ?>
          <?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>
          <?php print render($page['help']); ?>
          <?php print render($page['content']); ?>
          <?php print $feed_icons; ?>
        </div></div> <!-- /.section, /#main -->

      </div> <!-- /#content -->

    </div> <!-- /#content-wrapper -->

    <?php if ($page['content_bottom']): ?>
      <div id="bottom" class="clearfix"><div class="section">
        <div class="bottom-content">
          <?php print render($page['content_bottom']); ?>
        </div> <!-- /.bottom-content -->
      </div></div> <!-- /.section, /#bottom -->
    <?php endif; ?>

    <div id="footer-wrapper"><div id="footer"><div class="section">
      <?php print render($page['footer']); ?>
      </div></div> <!-- /.section, /#footer-->

      <?php if ($page['legal']): ?>
        <div id="legal"><div class="section">
          <?php print render($page['legal']); ?>
        </div></div> <!-- /.section, /#legal -->
      <?php endif; ?>
    </div> <!-- /#footer-wrapper -->

  </div></div></div></div> <!-- /#page, /#page-wrapper -->
