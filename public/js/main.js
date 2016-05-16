$(function initializeMap() {

    var graceHopperAcademy = new google.maps.LatLng(40.705086, -74.009151);

    var mapCanvas = document.getElementById('map-canvas');

    var currentMap = new google.maps.Map(mapCanvas, {
        center: graceHopperAcademy,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var iconURLs = {
        hotel: '/images/lodging_0star.png',
        restaurant: '/images/restaurant.png',
        activity: '/images/star-3.png'
    };

    function drawMarker(type, coords) {
        var latLng = new google.maps.LatLng(coords[0], coords[1]);
        var iconURL = iconURLs[type];
        var marker = new google.maps.Marker({
            icon: iconURL,
            position: latLng
        });
        marker.setMap(currentMap);
        return marker
    }

    var dayTemplate = `
          <section class="day">
            <div>
              <h4>My Hotel</h4>
              <ul class="list-group trip-day-hotels">
              </ul>
            </div>
            <div>
              <h4>My Restaurants</h4>
              <ul class="list-group trip-day-restaurants">
              </ul>
            </div>
            <div>
              <h4>My Activities</h4>
              <ul class="list-group trip-day-activities">
              </ul>
            </div>            
          </section>
    `
    $('#day-add').click(function addDay() {

        // Find the index of the last day section
        var ourIndex = $('section.day').last().data('index') + 1

        // 1. Create a new day section based off dayTemplate
        var day = $(dayTemplate)

        // Set the index on the section we're adding
        day[0].dataset.index = ourIndex

        // 2. Append it to the #itinerary
        $('#itinerary').append(day)

        // 3. Unselect all days
        $('.day').removeClass('selected')

        // 3a. select the one we just appended.
        $('#itinerary > .day').last().addClass('selected')


        $.ajax({
            method: 'POST',
            url: '/api/days',
            data: { index: ourIndex },
            success: function(dayData) {
                //creating a bbutton with the right number and a reference to the day's id
                var button = $(`<button class="btn btn-circle day-btn" data-day=${dayData.number} data-id=${dayData.id}>${dayData.number}</button>`);
                $('#day-add').before(button)
                $('.day-buttons > button').removeClass('current-day')

                button.addClass('current-day')

            },
            error: function(err) {
                console.log(err)
            }
        })
    })


    $('.day-buttons').on('click', 'button[data-day]', function(event) {
        // Deselect all buttons
        $('.day-buttons > button').removeClass('current-day')

        // Select the button that was clicked
        $(this).addClass('current-day')

        // Deselect all days
        $('.day')
            .removeClass('selected')
            .find('li').each(function(i, li) {
                //li.marker.setMap(null)
            })

        // Select the day for the button that was clicked
        $(`.day[data-index="${this.dataset.day}"]`)
            .addClass('selected')
            .find('li')
            .each(function(i, li) {
                //li.marker.setMap(currentMap)
            })

        $('#day-title-index').text(this.dataset.day)
    })

    $(document.body).on('click', 'button[data-action="addSelectionToTrip"]', function(event) {

        var attractionType = $(this).prev().data('type');
        var dest = $(this.dataset.destinationList)

        var dayId = $('.current-day').data().id;
        var attractionId;

        Array.from(
                // Get all selected options (usually just one, but why not support many?)
                $(this.dataset.sourceSelect)[0].selectedOptions)
            .forEach(function(option) {

                // Create a new list item with a delete button
                var li = $(`<li class=itinerary-item>
                     ${option.textContent}
                     <button data-action="deleteFromTrip" class="btn btn-xs btn-danger remove btn-circle">x</button>
                   </li>`)[0]

                attractionId = option.value;

                //if we're adding a hotel, add its id to the current day (persistence)
                if (attractionType === 'hotel') {
                    $.ajax({
                        method: 'PUT',
                        url: '/api/days/hotel',
                        data: { dayId: +dayId, hotelId: +attractionId },
                        success: function(dayUpdate) {},
                        error: function(err) {
                            console.log(err)
                        }
                    })
                } else if (attractionType === 'restaurant') {
                    $.ajax({
                        method: 'PUT',
                        url: '/api/restaurants',
                        data: { dayId: +dayId, restaurantId: +attractionId },
                        success: function(dayUpdate) {},
                        error: function(err) {
                            console.log(err)
                        }
                    })
                } else if (attractionType === 'activity') {
                    $.ajax({
                        method: 'PUT',
                        url: '/api/activities',
                        data: { dayId: +dayId, activityId: +attractionId },
                        success: function(dayUpdate) {},
                        error: function(err) {
                            console.log(err)
                        }
                    })
                }


                // Add to the destination list
                dest.append(li)

                // option.getAttribute('place-latitude')

                // // Draw a marker on the map
                // li.marker = drawMarker(option.attraction.place.type,
                //     option.attraction.place.location)
            });




    });

    $(document.body).on('click', 'button[data-action="deleteFromTrip"]', function(event) {
        // jQuery's closest function ascends the DOM tree to find the nearest ancestor matching
        // the selector.
        $(this).closest('li.itinerary-item').remove()
    })
});
