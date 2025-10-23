$(document).ready(function () {
    const $flipbook = $('#flipbook');
    const $leftArrow = $('#left-arrow');
    const $rightArrow = $('#right-arrow');
    
    // Text content for each page - UPDATE THESE WITH YOUR ACTUAL CONTENT
    const pageContent = {
        1: "This Prospectus introduces P K Das Deemed to be University, where we champion an educational philosophy that believes Multidisciplinarity Transcends Wisdom.",
        2: "We proudly acknowledge the profound legacy of our esteemed founder, Late P K DAS. A true visionary and the Founder Chairman of Nehru Group of Institutions, Tamil Nadu & Kerala, his distinguished qualifications, including Fellow of the Institution of Engineers, Fellow of the Institution of Mechanical Engineers , Associate Fellow of the Royal Aeronautical Society (London), Member of the Aeronautical Society of India , Master of Science , and Chartered Engineer , laid the groundwork for an institution committed to excellence. It is his unwavering dedication and pioneering spirit that continue to inspire and guide P K Das Deemed to be University in its pursuit of academic and societal advancement.",
        3: "A Tribute to Our Visionary Founder We honor the boundless life and legacy of our founder, the late Shri P K Das. Starting in 1968, this Founder Chairman of Nehru Group of Institutions dedicated his energy to establishing 16 prestigious institutions across Tamil Nadu and Kerala. A visionary leader and passionate academician, he possessed unwavering determination, discipline, and a strict self-discipline that defined his journey Overcoming insurmountable obstacles, he pioneered excellence, creating unique institutions like the flagship Nehru College of Aeronautics & Applied Sciences and later P K Das Institute of Medical Sciences. Though he passed in 2013, his wisdom and indelible spirit are evident in the quality and integrity of our institutions, which are now successfully led by his sons, Dr. P. Krishna das and Dr. P. Krishna kumar.His life—a simple, straight-forward journey marked by aristocratic behavioral traits—is an enduring inspiration that guides P K Das Deemed to be University to pursue excellence in education and service. His benevolence continues to bless our path.",
        4: "Nehru College of Educational and Charitable Trust A Legacy of Excellence Nehru College of Educational and Charitable Trust was established way back in 1968 by the founder Chairman late P K Das, an eminent Chartered Engineer, a renowned Academician, a great Industrialist and a well-known Philanthropist with the focused objective of imparting world class value added practical education in aviation and other fields of technology. The Trust moved powerfully for promoting a College of Aeronautics, diversified later on and established a cluster of Educational Institutions both in Tamil Nadu and Kerala. The Group of Institutions are now offering School Education, U G, P G and Research Programmes in Aeronautics, Arts & Science, Commerce, Management, Computer Science, Engineering, Medical, Pharmacy, Nursing, Physiotherapy, Health Sciences, Catering & Hotel Management, Costume Design & Fashion, Biotechnology, Microbiology, Visual Communication, Architecture and Law in addition to Diploma in Aeronautical and other fields of technology and have evolved into one of the biggest and reputed conglomeration of educational Institutions, popularly called Nehru Group of Institutions. Nehru Group of Institutions (NGI) has been actively involved in education for over five decades, managing 25 Institutions that offer a variety of programmes. Most of these institutions are accredited with A and A+ grades by NAAC, ranked within the 150 bandwidth by NIRF and have achieved an excellent band ranking in ARIIA by AICTE, UGC under the Ministry of Education, Government of India.The Group is now heralding for the cause of higher education in both the states with an expanded vision on the improvement of youth and socio-school academics into skill imparting, stimulation of thinking and creativity, value addition, entrepreneurship development, career placement and on the moulding of students to face the life challenges. The Group is proudly celebrating its 57th Anniversary on academic accomplishment to be reached forever. With the blessings of our Founder Chairman Late P K Das, the pioneering spirit behind every success, the Group is all set to gallop towards the vision, mission and goal.",
        5: "About P. K. DAS Deemed-to-be University,,,,        P K Das Institute of Social Science, Health Sciences & Technology is a Deemed to be University under Category Approved by Ministry of Education and University Grants Commission under Section 3 of UGC 1956 ,    University aims to impart complete Present and Ancient Indian Education to the Students. Community Comprising of Art, Science, Technology, Heritage, Health, Language, Literature, etc. University Provides World - Class Education, State of the Art, Infrastructure & a Vibrant Learning Environment,        Vision,,,,     Multi-disciplinary Higher Educational Research Institute of Excellence imparting ethically strong Indian origin Education combined with Modern Science and Technology to have a National Outlook and Global Impact,,,,    Mission,,,,       Have an Excellent Curriculum of Multidisciplinary in nature covering all the fields of Indian Knowledge System embedded with Modern Science and Technology,,,,      Encourage showcasing of hidden Talents of Students and Staff through regular activities in Multidisciplinary fields like Sports/ Cultural/ Yoga etc,,,,          Provide state of the Art Infrastructure with Research Facilities to encourage Innovative Activities,,,,,     Make all the Programmes Distinctive in one or the other way by incorporating new Ideas and Contents into the Curriculum",
        6: "Advocate Dr P. Krishna Das, Chancellor",
        7: "Message from the Chancellor",
        8: "Dr P. Krishna Kumar,Pro  Chancellor",
        9: "Message from the Pro Chancellor",
        // Add more pages as needed
        29: "Page 29: Feedback form. Please share your thoughts with us."
    };
    
    // Speech synthesis setup
    let currentSpeech = null;
    
    function speakPageContent(pageNumber) {
        // Stop any current speech
        if (currentSpeech) {
            window.speechSynthesis.cancel();
        }
        
        // Get content for the current page
        const content = pageContent[pageNumber];
        
        if (content) {
            currentSpeech = new SpeechSynthesisUtterance(content);
            currentSpeech.rate = 0.6; // Slightly slower for clarity
            currentSpeech.pitch = 0.9;
            currentSpeech.volume = 1;
            
            // Optional: Choose a specific voice
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                // Try to find an English voice
                const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                if (englishVoice) {
                    currentSpeech.voice = englishVoice;
                }
            }
            
            // Start speaking
            window.speechSynthesis.speak(currentSpeech);
        }
    }
    
    // Initialize the flipbook using turn.js
    $flipbook.turn({
        width: 800,
        height: 2000,
        autoCenter: true,
        display: 'single',
        duration: 4000,
        elevation: 100,
        when: {
            turning: function(event, page, view) {
                // Stop speech when turning page
                window.speechSynthesis.cancel();
                document.getElementById('page-turn-sound').play();
            },
            turned: function(event, page, view) {
                // Start reading the new page after turn animation
                setTimeout(function() {
                    speakPageContent(page);
                }, 500); // Small delay to let page settle
            }
        }
    });
    
    // Function to show/hide arrows based on current page
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
    
    // Bind arrow click events
    $leftArrow.on('click', function () {
        $flipbook.turn('previous');
    });
    
    $rightArrow.on('click', function () {
        $flipbook.turn('next');
    });
    
    // Run once when ready
    updateArrows();
    
    // Bind to 'turned' event to update arrows
    $flipbook.bind('turned', function (e, page) {
        updateArrows();
    });
    
    // Load voices (some browsers load voices asynchronously)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = function() {
            // Voices loaded
        };
    }
    
    // Read the first page when document loads (after 5 seconds)
    setTimeout(function() {
        speakPageContent($flipbook.turn('page'));
    }, 5000);
    
    // Optional: Add a mute/unmute button functionality
    // You can add this to your HTML if needed
    window.toggleSpeech = function() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        } else {
            speakPageContent($flipbook.turn('page'));
        }
    };
    
    // Stop speech when page is about to unload
    $(window).on('beforeunload', function() {
        window.speechSynthesis.cancel();
    });
});
