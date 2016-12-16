<time-item>
  <li class={ billed: billed }><input type="checkbox" checked={ selected } onchange={ parent.select }/> { parent.getName(project) } { date } - { hours } - { description } <button type="button" onclick={ parent.editEntry }>Edit</button> <button type="button" onclick={ parent.deleteEntry }>Delete</button></li>

  <script>

  </script>
</time-item>
