<app-nav>
  <nav>
    <ul>
      <li each={ links }><a href={'#' + url}>{ text }</a></li>
    </ul>
  </nav>

  <script>
    var tag = this;

    this.links = this.opts.links;
  </script>
</app-nav>