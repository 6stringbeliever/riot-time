<app-nav>
  <nav>
    <ul>
      <li each={ links }><a href={'#' + url}>{ text }</a></li>
    </ul>
  </nav>

  <script>
    var tag = this;

    this.links = this.refs.links;
  </script>
</app-nav>
