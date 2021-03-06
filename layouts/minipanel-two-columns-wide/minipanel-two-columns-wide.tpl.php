<?php
/**
 * @file
 * Template for Panopoly Selby Flipped.
 *
 * Variables:
 * - $css_id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 * panel of the layout. This layout supports the following sections:
 */
?>

<div class="supermenu-row">
  <div class="supermenu-pane supermenu-two-column-wide">
      <?php print $content['columnone']; ?>
  </div>
  <div class="supermenu-pane supermenu-two-column-wide wide-column">
      <?php print $content['columntwo']; ?>
  </div>
</div>
<!-- /.gsb-front-page -->
