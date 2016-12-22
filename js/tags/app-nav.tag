<app-nav>
  <nav>
    <ul>
      <li each={ links }><a href={'#' + url}>{ text }</a></li>
    </ul>
  </nav>

  <script>
    var tag = this;

    this.links = [
      {text: 'Enter Time',
      url: 'time'},
      {text: 'Reports',
      url: 'reports'},
      {text: 'Projects',
      url: 'projects'}
    ];
  </script>
</app-nav>
