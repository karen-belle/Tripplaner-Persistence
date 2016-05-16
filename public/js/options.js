$.get('/api/hotels', function(hotels) {
        hotels.forEach(function(hotel) {
            $('#hotel-choices').append(`<option value="${hotel.id}">${hotel.name}</option>`);
        });
    })
    .fail(console.error.bind(console));

$.get('/api/restaurants', function(restaurants) {
        restaurants.forEach(function(restaurant) {
            $('#restaurant-choices').append(`<option value="${restaurant.id}">${restaurant.name}</option>`);
        });
    })
    .fail(console.error.bind(console));

$.get('/api/activities', function(activities) {
        activities.forEach(function(activity) {
            $('#activity-choices').append(`<option value="${activity.id}">${activity.name}</option>`);
        });
    })
    .fail(console.error.bind(console));

// $.get('/api/days', function(days) {

//         days.forEach(function(day) {
//           //   $('#itinerary').append(` <section class="day">
//           //   <div>
//           //     <h4>My Hotel</h4>
//           //     <ul class="list-group trip-day-hotels">
//           //     <li class=itinerary-item>
//           //            ${day.hotelId}
//           //            <button data-action="deleteFromTrip" class="btn btn-xs btn-danger remove btn-circle">x</button>
//           //         </li>
//           //     </ul>
//           //   </div>
//           //   <div>
//           //     <h4>My Restaurants</h4>
//           //     <ul class="list-group trip-day-restaurants">
//           //     <li class=itinerary-item>
//           //            ${day.restaurantId}
//           //            <button data-action="deleteFromTrip" class="btn btn-xs btn-danger remove btn-circle">x</button>
//           //         </li>
//           //     </ul>
//           //   </div>
//           //   <div>
//           //     <h4>My Activities</h4>
//           //     <ul class="list-group trip-day-activities">
//           //     <li class=itinerary-item>
//           //            ${day.activityId}
//           //            <button data-action="deleteFromTrip" class="btn btn-xs btn-danger remove btn-circle">x</button>
//           //         </li>
//           //     </ul>
//           //   </div>            
//           // </section>`)

//         });
//     })
//     .fail(console.error.bind(console));
$.get('/api/days', function (data) {console.log('GET response data', data)})
  .fail( console.error.bind(console) );


