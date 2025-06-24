$(document).ready(function () {
  const $flipbook = $('#flipbook');
  const $leftArrow = $('#left-arrow');
  const $rightArrow = $('#right-arrow');

  // 1. Initialize flipbook
  $flipbook.turn({
    width: 375,
    height: 667,
    autoCenter: true,
    display: 'single',
    elevation: 100,
    duration: 4000,
    when: {
      turning: function (event, page, view) {
        document.getElementById('page-turn-sound').play();
      }
    }
  });

  // 2. Update arrows
  function updateArrows() {
    const currentPage = $flipbook.turn('page');
    const totalPages = $flipbook.turn('pages');

    $leftArrow.toggle(currentPage > 1);
    $rightArrow.toggle(currentPage < totalPages);
  }

  // 3. Bind arrow click
  $leftArrow.on('click', () => {
    $flipbook.turn('previous');
  });

  $rightArrow.on('click', () => {
    $flipbook.turn('next');
  });

  // 4. Initial update
  updateArrows();

  // 5. On page turn
  $flipbook.bind('turned', () => {
    updateArrows();
  });

  // 6. Falling Leaf Effect
  setInterval(() => {
    const leaf = $('<img class="falling-leaf" src="./img/ballon.png">');
    const size = 60 + Math.random() * 40;
    const left = Math.random() * 100;

    leaf.css({
      left: left + 'vw',
      width: size + 'px',
      animationDuration: (5 + Math.random() * 5) + 's'
    });

    $('body').append(leaf);

    setTimeout(() => {
      leaf.remove();
    }, 10000);
  }, 800);
});
