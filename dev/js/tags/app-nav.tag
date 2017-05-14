<app-nav>
  <nav>
    <ul class="header-nav">
      <li class="header-nav-item" each={ links }><a href={'#' + url}>{ text }</a></li>
    </ul>
  </nav>

  <script>
    var tag = this;

    this.links = this.opts.links;
  </script>
</app-nav>
