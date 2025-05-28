  $(document).ready(function () {
    const $flipbook = $('#flipbook');
    const $leftArrow = $('#left-arrow');
    const $rightArrow = $('#right-arrow');

    //  1. Initialize the flipbook using turn.js
    $flipbook.turn({
      width: 800,
      height: 2000,
      autoCenter: true,
      display: 'single', // Set to single page display


    
       
 
  duration: 4000,        // Slow page turn
  elevation: 100,         // Optional visual effect

       when: {
            turning: function(event, page, view) {
                document.getElementById('page-turn-sound').play();
            }
        }

    });

    //  2. Function to show/hide arrows based on current page
    function updateArrows() {
      const currentPage = $flipbook.turn('page');
      const totalPages = $flipbook.turn('pages');

      // Show/hide left arrow
      if (currentPage <= 1) {
        $leftArrow.hide();
      } else {
        $leftArrow.show();
      }

      // Show/hide right arrow
      if (currentPage >= totalPages) {
        $rightArrow.hide();
      } else {
        $rightArrow.show();
      }
    }

    //  3. Bind arrow click events
    $leftArrow.on('click', function () {
      $flipbook.turn('previous');
    });

    $rightArrow.on('click', function () {
      $flipbook.turn('next');
    });

    //  4. Run once when ready
    updateArrows();

    //  5. Bind to 'turned' event to update arrows every time
    $flipbook.bind('turned', function (e, page) {
      updateArrows();
    });
  });
