function init_socket() {
  interval_id = undefined;
  ws = new WebSocket("wss://chat.napaglobal.com/sockjs/415/r9o9xj8e/websocket");
  ws.onopen = function (event) {
    console.log("Connected..............");

    ws.send(
      String.raw`["{\"msg\":\"connect\",\"version\":\"1\",\"support\":[\"1\",\"pre2\",\"pre1\"]}"]`
    );
    ws.send(
      String.raw`["{\"msg\":\"method\",\"id\":\"1\",\"method\":\"login\",\"params\":[{\"resume\":\"nbpOPsyK_qCQv5yARBCoDL3A89WVH1IIotA2DTyJ47G\"}]}"]`
    );
    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"7omwdva3SJ7DPfMxi\",\"name\":\"meteor.loginServiceConfiguration\",\"params\":[]}"]`
    );
    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"om5JqyLdpottFh2rN\",\"name\":\"meteor_autoupdate_clientVersions\",\"params\":[]}"]`
    );
    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"rC6RbFQ35cbEaHvvX\",\"name\":\"stream-notify-user\",\"params\":[\"bxwDo5djch5WprLe8/message\",{\"useCollection\":false,\"args\":[]}]}"]`
    );
    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"p5Pd9ufr4TEtjBGZn\",\"name\":\"stream-notify-user\",\"params\":[\"bxwDo5djch5WprLe8/subscriptions-changed\",{\"useCollection\":false,\"args\":[]}]}"]`
    );
    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"WxEjFAsi8PX4KAsh4\",\"name\":\"stream-roles\",\"params\":[\"roles\",{\"useCollection\":false,\"args\":[]}]}"]`
    );

    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"tekFmAjM7bpegcqsS\",\"name\":\"stream-notify-room\",\"params\":[\"bxwDo5djch5WprLe8gX27pkFhmuBQM8RZR/user-activity\",{\"useCollection\":false,\"args\":[]}]}"]`
    );

    ws.send(
      String.raw`["{\"msg\":\"sub\",\"id\":\"xbTE9tKDKrXCTAk3Y\",\"name\":\"stream-room-messages\",\"params\":[\"bxwDo5djch5WprLe8gX27pkFhmuBQM8RZR\",{\"useCollection\":false,\"args\":[]}]}"]`
    );

    interval_id = setInterval(() => {
      ws.send(String.raw`["{\"msg\":\"ping\"}"]`);
    }, 8000);
  };
  ws.onmessage = function (event) {
    if (event?.data?.includes("ping")) {
      ws.send(String.raw`["{\"msg\":\"pong\"}"]`);
    } else console.log(event.data);
  };

  ws.onclose = function clear_interval() {
    clearInterval(interval_id);
    ws = undefined;
    console.error("WebSocket closed.\n");
  };

  ws.onerror = function handle_error(error) {
    console.error("WebSocket error.\n", error);
    ws = undefined;
  };

  return ws;
}

function spam_emoij(message_id, num_of_emoij = 10, delay = 1000) {
  if (!ws) {
    throw "WebSocket was not inital yet!";
  }

  if (!num_of_emoij) return;

  let i = 0,
    interval_id = undefined;

  interval_id = setInterval(() => {
    try {
      console.log("spam emoij -> ", emoijs[i]);
      let message = String.raw`["{\"msg\":\"method\",\"id\":\"20\",\"method\":\"setReaction\",\"params\":[\"emoij\",\"message_id\"]}"]`;
      message = message
        .replace("emoij", emoijs[i])
        .replace("message_id", message_id);
      ws.send(message);

      i++;
      if (i >= num_of_emoij) stop_interval();
    } catch (error) {
      stop_interval();
    }
  }, delay);

  function stop_interval() {
    clearInterval(interval_id);
    stop_interval = undefined;
  }
}

function send_raw_json(message) {
  ws.send(String.raw`${message}`);
}

// 1650 emoijs
emoijs = [
  ":smiley:",
  ":smile:",
  ":grin:",
  ":laughing:",
  ":sweat_smile:",
  ":joy:",
  ":rofl:",
  ":relaxed:",
  ":blush:",
  ":innocent:",
  ":slight_smile:",
  ":upside_down:",
  ":wink:",
  ":relieved:",
  ":kissing_heart:",
  ":smiling_face_with_3_hearts:",
  ":kissing:",
  ":kissing_smiling_eyes:",
  ":kissing_closed_eyes:",
  ":stuck_out_tongue_closed_eyes:",
  ":stuck_out_tongue_winking_eye:",
  ":zany_face:",
  ":face_with_raised_eyebrow:",
  ":face_with_monocle:",
  ":nerd:",
  ":sunglasses:",
  ":star_struck:",
  ":smirk:",
  ":unamused:",
  ":disappointed:",
  ":pensive:",
  ":worried:",
  ":confused:",
  ":slight_frown:",
  ":frowning2:",
  ":confounded:",
  ":tired_face:",
  ":weary:",
  ":cry:",
  ":sob:",
  ":triumph:",
  ":angry:",
  ":rage:",
  ":face_with_symbols_over_mouth:",
  ":exploding_head:",
  ":flushed:",
  ":scream:",
  ":fearful:",
  ":cold_sweat:",
  ":hot_face:",
  ":cold_face:",
  ":pleading_face:",
  ":disappointed_relieved:",
  ":sweat:",
  ":hugging:",
  ":thinking:",
  ":face_with_hand_over_mouth:",
  ":shushing_face:",
  ":lying_face:",
  ":no_mouth:",
  ":neutral_face:",
  ":expressionless:",
  ":grimacing:",
  ":rolling_eyes:",
  ":hushed:",
  ":frowning:",
  ":anguished:",
  ":open_mouth:",
  ":astonished:",
  ":sleeping:",
  ":drooling_face:",
  ":sleepy:",
  ":dizzy_face:",
  ":zipper_mouth:",
  ":woozy_face:",
  ":nauseated_face:",
  ":face_vomiting:",
  ":sneezing_face:",
  ":mask:",
  ":thermometer_face:",
  ":head_bandage:",
  ":money_mouth:",
  ":cowboy:",
  ":smiling_imp:",
  ":imp:",
  ":japanese_ogre:",
  ":japanese_goblin:",
  ":clown:",
  ":poop:",
  ":ghost:",
  ":skull:",
  ":skull_crossbones:",
  ":alien:",
  ":space_invader:",
  ":robot:",
  ":jack_o_lantern:",
  ":smiley_cat:",
  ":smile_cat:",
  ":joy_cat:",
  ":heart_eyes_cat:",
  ":smirk_cat:",
  ":kissing_cat:",
  ":scream_cat:",
  ":crying_cat_face:",
  ":pouting_cat:",
  ":palms_up_together:",
  ":open_hands:",
  ":raised_hands:",
  ":clap:",
  ":handshake:",
  ":thumbsup:",
  ":thumbsdown:",
  ":punch:",
  ":fist:",
  ":left_facing_fist:",
  ":right_facing_fist:",
  ":fingers_crossed:",
  ":v:",
  ":love_you_gesture:",
  ":metal:",
  ":ok_hand:",
  ":point_left:",
  ":point_right:",
  ":point_up_2:",
  ":point_down:",
  ":point_up:",
  ":raised_hand:",
  ":raised_back_of_hand:",
  ":hand_splayed:",
  ":vulcan:",
  ":wave:",
  ":call_me:",
  ":muscle:",
  ":leg:",
  ":foot:",
  ":middle_finger:",
  ":writing_hand:",
  ":pray:",
  ":ring:",
  ":lipstick:",
  ":kiss:",
  ":lips:",
  ":tongue:",
  ":ear:",
  ":nose:",
  ":footprints:",
  ":eye:",
  ":eyes:",
  ":brain:",
  ":bone:",
  ":tooth:",
  ":speaking_head:",
  ":bust_in_silhouette:",
  ":busts_in_silhouette:",
  ":baby:",
  ":girl:",
  ":child:",
  ":boy:",
  ":woman:",
  ":adult:",
  ":man:",
  ":blond_haired_person:",
  ":blond-haired_woman:",
  ":blond-haired_man:",
  ":woman_red_haired:",
  ":man_red_haired:",
  ":woman_curly_haired:",
  ":man_curly_haired:",
  ":woman_white_haired:",
  ":man_white_haired:",
  ":woman_bald:",
  ":man_bald:",
  ":bearded_person:",
  ":older_woman:",
  ":older_adult:",
  ":older_man:",
  ":man_with_chinese_cap:",
  ":person_wearing_turban:",
  ":woman_wearing_turban:",
  ":man_wearing_turban:",
  ":woman_with_headscarf:",
  ":police_officer:",
  ":woman_police_officer:",
  ":man_police_officer:",
  ":construction_worker:",
  ":woman_construction_worker:",
  ":man_construction_worker:",
  ":guard:",
  ":woman_guard:",
  ":man_guard:",
  ":detective:",
  ":woman_detective:",
  ":man_detective:",
  ":woman_health_worker:",
  ":man_health_worker:",
  ":woman_farmer:",
  ":man_farmer:",
  ":woman_cook:",
  ":man_cook:",
  ":woman_student:",
  ":man_student:",
  ":woman_singer:",
  ":man_singer:",
  ":woman_teacher:",
  ":man_teacher:",
  ":woman_factory_worker:",
  ":man_factory_worker:",
  ":woman_technologist:",
  ":man_technologist:",
  ":woman_office_worker:",
  ":man_office_worker:",
  ":woman_mechanic:",
  ":man_mechanic:",
  ":woman_scientist:",
  ":man_scientist:",
  ":woman_artist:",
  ":man_artist:",
  ":woman_firefighter:",
  ":man_firefighter:",
  ":woman_pilot:",
  ":man_pilot:",
  ":woman_astronaut:",
  ":man_astronaut:",
  ":woman_judge:",
  ":man_judge:",
  ":bride_with_veil:",
  ":man_in_tuxedo:",
  ":princess:",
  ":prince:",
  ":mrs_claus:",
  ":santa:",
  ":superhero:",
  ":woman_superhero:",
  ":man_superhero:",
  ":supervillain:",
  ":woman_supervillain:",
  ":man_supervillain:",
  ":mage:",
  ":woman_mage:",
  ":man_mage:",
  ":elf:",
  ":woman_elf:",
  ":man_elf:",
  ":vampire:",
  ":woman_vampire:",
  ":man_vampire:",
  ":zombie:",
  ":woman_zombie:",
  ":man_zombie:",
  ":genie:",
  ":woman_genie:",
  ":man_genie:",
  ":merperson:",
  ":mermaid:",
  ":merman:",
  ":fairy:",
  ":woman_fairy:",
  ":man_fairy:",
  ":angel:",
  ":pregnant_woman:",
  ":breast_feeding:",
  ":person_bowing:",
  ":woman_bowing:",
  ":man_bowing:",
  ":person_tipping_hand:",
  ":woman_tipping_hand:",
  ":man_tipping_hand:",
  ":person_gesturing_no:",
  ":woman_gesturing_no:",
  ":man_gesturing_no:",
  ":person_gesturing_ok:",
  ":woman_gesturing_ok:",
  ":man_gesturing_ok:",
  ":person_raising_hand:",
  ":woman_raising_hand:",
  ":man_raising_hand:",
  ":person_facepalming:",
  ":woman_facepalming:",
  ":man_facepalming:",
  ":person_shrugging:",
  ":woman_shrugging:",
  ":man_shrugging:",
  ":person_pouting:",
  ":woman_pouting:",
  ":man_pouting:",
  ":person_frowning:",
  ":woman_frowning:",
  ":man_frowning:",
  ":person_getting_haircut:",
  ":woman_getting_haircut:",
  ":man_getting_haircut:",
  ":person_getting_massage:",
  ":woman_getting_face_massage:",
  ":man_getting_face_massage:",
  ":person_in_steamy_room:",
  ":woman_in_steamy_room:",
  ":man_in_steamy_room:",
  ":nail_care:",
  ":selfie:",
  ":dancer:",
  ":man_dancing:",
  ":people_with_bunny_ears_partying:",
  ":women_with_bunny_ears_partying:",
  ":men_with_bunny_ears_partying:",
  ":levitate:",
  ":person_walking:",
  ":woman_walking:",
  ":man_walking:",
  ":person_running:",
  ":woman_running:",
  ":man_running:",
  ":couple:",
  ":two_women_holding_hands:",
  ":two_men_holding_hands:",
  ":couple_with_heart:",
  ":couple_with_heart_woman_man:",
  ":couple_ww:",
  ":couple_mm:",
  ":couplekiss:",
  ":kiss_woman_man:",
  ":kiss_ww:",
  ":kiss_mm:",
  ":family:",
  ":family_man_woman_boy:",
  ":family_mwg:",
  ":family_mwgb:",
  ":family_mwbb:",
  ":family_mwgg:",
  ":family_wwb:",
  ":family_wwg:",
  ":family_wwgb:",
  ":family_wwbb:",
  ":family_wwgg:",
  ":family_mmb:",
  ":family_mmg:",
  ":family_mmgb:",
  ":family_mmbb:",
  ":family_mmgg:",
  ":family_woman_boy:",
  ":family_woman_girl:",
  ":family_woman_girl_boy:",
  ":family_woman_boy_boy:",
  ":family_woman_girl_girl:",
  ":family_man_boy:",
  ":family_man_girl:",
  ":family_man_girl_boy:",
  ":family_man_boy_boy:",
  ":family_man_girl_girl:",
  ":coat:",
  ":womans_clothes:",
  ":shirt:",
  ":jeans:",
  ":necktie:",
  ":dress:",
  ":bikini:",
  ":kimono:",
  ":lab_coat:",
  ":high_heel:",
  ":sandal:",
  ":boot:",
  ":mans_shoe:",
  ":athletic_shoe:",
  ":hiking_boot:",
  ":womans_flat_shoe:",
  ":socks:",
  ":gloves:",
  ":scarf:",
  ":tophat:",
  ":billed_cap:",
  ":womans_hat:",
  ":mortar_board:",
  ":helmet_with_cross:",
  ":crown:",
  ":pouch:",
  ":purse:",
  ":handbag:",
  ":briefcase:",
  ":school_satchel:",
  ":eyeglasses:",
  ":dark_sunglasses:",
  ":goggles:",
  ":closed_umbrella:",
  ":red_haired:",
  ":curly_haired:",
  ":white_haired:",
  ":bald:",
  ":dog:",
  ":cat:",
  ":mouse:",
  ":hamster:",
  ":rabbit:",
  ":fox:",
  ":raccoon:",
  ":bear:",
  ":panda_face:",
  ":kangaroo:",
  ":badger:",
  ":koala:",
  ":tiger:",
  ":lion_face:",
  ":cow:",
  ":pig:",
  ":pig_nose:",
  ":frog:",
  ":monkey_face:",
  ":see_no_evil:",
  ":hear_no_evil:",
  ":speak_no_evil:",
  ":monkey:",
  ":chicken:",
  ":penguin:",
  ":bird:",
  ":baby_chick:",
  ":hatching_chick:",
  ":hatched_chick:",
  ":duck:",
  ":swan:",
  ":eagle:",
  ":owl:",
  ":parrot:",
  ":peacock:",
  ":bat:",
  ":wolf:",
  ":boar:",
  ":horse:",
  ":unicorn:",
  ":bee:",
  ":bug:",
  ":butterfly:",
  ":snail:",
  ":shell:",
  ":beetle:",
  ":ant:",
  ":cricket:",
  ":spider:",
  ":spider_web:",
  ":scorpion:",
  ":mosquito:",
  ":microbe:",
  ":turtle:",
  ":snake:",
  ":lizard:",
  ":t_rex:",
  ":sauropod:",
  ":octopus:",
  ":squid:",
  ":shrimp:",
  ":crab:",
  ":lobster:",
  ":blowfish:",
  ":tropical_fish:",
  ":fish:",
  ":dolphin:",
  ":whale:",
  ":whale2:",
  ":shark:",
  ":crocodile:",
  ":tiger2:",
  ":leopard:",
  ":zebra:",
  ":gorilla:",
  ":elephant:",
  ":rhino:",
  ":hippopotamus:",
  ":dromedary_camel:",
  ":camel:",
  ":giraffe:",
  ":llama:",
  ":water_buffalo:",
  ":ox:",
  ":cow2:",
  ":racehorse:",
  ":pig2:",
  ":ram:",
  ":sheep:",
  ":goat:",
  ":deer:",
  ":dog2:",
  ":poodle:",
  ":cat2:",
  ":rooster:",
  ":turkey:",
  ":dove:",
  ":rabbit2:",
  ":mouse2:",
  ":rat:",
  ":chipmunk:",
  ":hedgehog:",
  ":feet:",
  ":dragon:",
  ":dragon_face:",
  ":cactus:",
  ":christmas_tree:",
  ":evergreen_tree:",
  ":deciduous_tree:",
  ":palm_tree:",
  ":seedling:",
  ":herb:",
  ":shamrock:",
  ":four_leaf_clover:",
  ":bamboo:",
  ":tanabata_tree:",
  ":leaves:",
  ":fallen_leaf:",
  ":maple_leaf:",
  ":mushroom:",
  ":ear_of_rice:",
  ":bouquet:",
  ":tulip:",
  ":rose:",
  ":wilted_rose:",
  ":hibiscus:",
  ":cherry_blossom:",
  ":blossom:",
  ":sunflower:",
  ":sun_with_face:",
  ":full_moon_with_face:",
  ":first_quarter_moon_with_face:",
  ":last_quarter_moon_with_face:",
  ":new_moon_with_face:",
  ":full_moon:",
  ":waning_gibbous_moon:",
  ":last_quarter_moon:",
  ":waning_crescent_moon:",
  ":new_moon:",
  ":waxing_crescent_moon:",
  ":first_quarter_moon:",
  ":waxing_gibbous_moon:",
  ":crescent_moon:",
  ":earth_americas:",
  ":earth_africa:",
  ":earth_asia:",
  ":dizzy:",
  ":star:",
  ":star2:",
  ":sparkles:",
  ":zap:",
  ":comet:",
  ":boom:",
  ":fire:",
  ":cloud_tornado:",
  ":rainbow:",
  ":sunny:",
  ":white_sun_small_cloud:",
  ":partly_sunny:",
  ":white_sun_cloud:",
  ":cloud:",
  ":white_sun_rain_cloud:",
  ":cloud_rain:",
  ":thunder_cloud_rain:",
  ":cloud_lightning:",
  ":cloud_snow:",
  ":snowflake:",
  ":snowman2:",
  ":snowman:",
  ":wind_blowing_face:",
  ":dash:",
  ":droplet:",
  ":sweat_drops:",
  ":umbrella:",
  ":umbrella2:",
  ":ocean:",
  ":fog:",
  ":green_apple:",
  ":apple:",
  ":pear:",
  ":tangerine:",
  ":lemon:",
  ":banana:",
  ":watermelon:",
  ":grapes:",
  ":strawberry:",
  ":melon:",
  ":cherries:",
  ":peach:",
  ":mango:",
  ":pineapple:",
  ":coconut:",
  ":kiwi:",
  ":tomato:",
  ":eggplant:",
  ":avocado:",
  ":broccoli:",
  ":leafy_green:",
  ":cucumber:",
  ":hot_pepper:",
  ":corn:",
  ":carrot:",
  ":potato:",
  ":sweet_potato:",
  ":croissant:",
  ":bread:",
  ":french_bread:",
  ":pretzel:",
  ":bagel:",
  ":cheese:",
  ":egg:",
  ":cooking:",
  ":pancakes:",
  ":bacon:",
  ":cut_of_meat:",
  ":poultry_leg:",
  ":meat_on_bone:",
  ":hotdog:",
  ":hamburger:",
  ":fries:",
  ":pizza:",
  ":sandwich:",
  ":stuffed_flatbread:",
  ":taco:",
  ":burrito:",
  ":salad:",
  ":shallow_pan_of_food:",
  ":canned_food:",
  ":spaghetti:",
  ":ramen:",
  ":stew:",
  ":curry:",
  ":sushi:",
  ":bento:",
  ":fried_shrimp:",
  ":rice_ball:",
  ":rice:",
  ":rice_cracker:",
  ":fish_cake:",
  ":fortune_cookie:",
  ":oden:",
  ":dango:",
  ":shaved_ice:",
  ":ice_cream:",
  ":icecream:",
  ":pie:",
  ":cake:",
  ":birthday:",
  ":moon_cake:",
  ":cupcake:",
  ":custard:",
  ":lollipop:",
  ":candy:",
  ":chocolate_bar:",
  ":popcorn:",
  ":salt:",
  ":doughnut:",
  ":dumpling:",
  ":cookie:",
  ":chestnut:",
  ":peanuts:",
  ":honey_pot:",
  ":milk:",
  ":baby_bottle:",
  ":coffee:",
  ":tea:",
  ":cup_with_straw:",
  ":sake:",
  ":beer:",
  ":beers:",
  ":champagne_glass:",
  ":wine_glass:",
  ":tumbler_glass:",
  ":cocktail:",
  ":tropical_drink:",
  ":champagne:",
  ":spoon:",
  ":fork_and_knife:",
  ":fork_knife_plate:",
  ":bowl_with_spoon:",
  ":takeout_box:",
  ":chopsticks:",
  ":soccer:",
  ":basketball:",
  ":football:",
  ":baseball:",
  ":softball:",
  ":tennis:",
  ":volleyball:",
  ":rugby_football:",
  ":8ball:",
  ":ping_pong:",
  ":badminton:",
  ":goal:",
  ":hockey:",
  ":field_hockey:",
  ":cricket_game:",
  ":lacrosse:",
  ":golf:",
  ":flying_disc:",
  ":bow_and_arrow:",
  ":fishing_pole_and_fish:",
  ":boxing_glove:",
  ":martial_arts_uniform:",
  ":running_shirt_with_sash:",
  ":skateboard:",
  ":ice_skate:",
  ":curling_stone:",
  ":sled:",
  ":ski:",
  ":skier:",
  ":snowboarder:",
  ":person_lifting_weights:",
  ":woman_lifting_weights:",
  ":man_lifting_weights:",
  ":people_wrestling:",
  ":women_wrestling:",
  ":men_wrestling:",
  ":person_doing_cartwheel:",
  ":woman_cartwheeling:",
  ":man_cartwheeling:",
  ":person_bouncing_ball:",
  ":woman_bouncing_ball:",
  ":man_bouncing_ball:",
  ":person_fencing:",
  ":person_playing_handball:",
  ":woman_playing_handball:",
  ":man_playing_handball:",
  ":person_golfing:",
  ":woman_golfing:",
  ":man_golfing:",
  ":horse_racing:",
  ":person_in_lotus_position:",
  ":woman_in_lotus_position:",
  ":man_in_lotus_position:",
  ":person_surfing:",
  ":woman_surfing:",
  ":man_surfing:",
  ":person_swimming:",
  ":woman_swimming:",
  ":man_swimming:",
  ":person_playing_water_polo:",
  ":woman_playing_water_polo:",
  ":man_playing_water_polo:",
  ":person_rowing_boat:",
  ":woman_rowing_boat:",
  ":man_rowing_boat:",
  ":person_climbing:",
  ":woman_climbing:",
  ":man_climbing:",
  ":person_mountain_biking:",
  ":woman_mountain_biking:",
  ":man_mountain_biking:",
  ":person_biking:",
  ":woman_biking:",
  ":man_biking:",
  ":trophy:",
  ":first_place:",
  ":second_place:",
  ":third_place:",
  ":medal:",
  ":military_medal:",
  ":rosette:",
  ":reminder_ribbon:",
  ":ticket:",
  ":tickets:",
  ":circus_tent:",
  ":person_juggling:",
  ":woman_juggling:",
  ":man_juggling:",
  ":performing_arts:",
  ":art:",
  ":clapper:",
  ":microphone:",
  ":headphones:",
  ":musical_score:",
  ":musical_keyboard:",
  ":drum:",
  ":saxophone:",
  ":trumpet:",
  ":guitar:",
  ":violin:",
  ":game_die:",
  ":dart:",
  ":bowling:",
  ":video_game:",
  ":slot_machine:",
  ":red_car:",
  ":taxi:",
  ":blue_car:",
  ":bus:",
  ":trolleybus:",
  ":race_car:",
  ":police_car:",
  ":ambulance:",
  ":fire_engine:",
  ":minibus:",
  ":truck:",
  ":articulated_lorry:",
  ":tractor:",
  ":scooter:",
  ":bike:",
  ":motor_scooter:",
  ":motorcycle:",
  ":rotating_light:",
  ":oncoming_police_car:",
  ":oncoming_bus:",
  ":oncoming_automobile:",
  ":oncoming_taxi:",
  ":aerial_tramway:",
  ":mountain_cableway:",
  ":suspension_railway:",
  ":railway_car:",
  ":train:",
  ":mountain_railway:",
  ":monorail:",
  ":bullettrain_side:",
  ":bullettrain_front:",
  ":light_rail:",
  ":steam_locomotive:",
  ":train2:",
  ":metro:",
  ":tram:",
  ":station:",
  ":airplane:",
  ":airplane_departure:",
  ":airplane_arriving:",
  ":airplane_small:",
  ":seat:",
  ":luggage:",
  ":satellite_orbital:",
  ":rocket:",
  ":flying_saucer:",
  ":helicopter:",
  ":canoe:",
  ":sailboat:",
  ":speedboat:",
  ":motorboat:",
  ":cruise_ship:",
  ":ferry:",
  ":ship:",
  ":anchor:",
  ":fuelpump:",
  ":construction:",
  ":vertical_traffic_light:",
  ":traffic_light:",
  ":busstop:",
  ":map:",
  ":moyai:",
  ":statue_of_liberty:",
  ":tokyo_tower:",
  ":european_castle:",
  ":japanese_castle:",
  ":stadium:",
  ":ferris_wheel:",
  ":roller_coaster:",
  ":carousel_horse:",
  ":fountain:",
  ":beach_umbrella:",
  ":beach:",
  ":island:",
  ":desert:",
  ":volcano:",
  ":mountain:",
  ":mountain_snow:",
  ":mount_fuji:",
  ":camping:",
  ":tent:",
  ":house:",
  ":house_with_garden:",
  ":homes:",
  ":house_abandoned:",
  ":construction_site:",
  ":factory:",
  ":office:",
  ":department_store:",
  ":post_office:",
  ":european_post_office:",
  ":hospital:",
  ":bank:",
  ":hotel:",
  ":convenience_store:",
  ":school:",
  ":love_hotel:",
  ":wedding:",
  ":classical_building:",
  ":church:",
  ":mosque:",
  ":synagogue:",
  ":kaaba:",
  ":shinto_shrine:",
  ":railway_track:",
  ":motorway:",
  ":japan:",
  ":rice_scene:",
  ":park:",
  ":sunrise:",
  ":sunrise_over_mountains:",
  ":stars:",
  ":sparkler:",
  ":fireworks:",
  ":firecracker:",
  ":city_sunset:",
  ":city_dusk:",
  ":cityscape:",
  ":night_with_stars:",
  ":milky_way:",
  ":bridge_at_night:",
  ":foggy:",
  ":watch:",
  ":iphone:",
  ":calling:",
  ":computer:",
  ":keyboard:",
  ":desktop:",
  ":printer:",
  ":mouse_three_button:",
  ":trackball:",
  ":joystick:",
  ":chess_pawn:",
  ":jigsaw:",
  ":compression:",
  ":minidisc:",
  ":floppy_disk:",
  ":cd:",
  ":dvd:",
  ":vhs:",
  ":camera:",
  ":camera_with_flash:",
  ":video_camera:",
  ":movie_camera:",
  ":projector:",
  ":film_frames:",
  ":telephone_receiver:",
  ":telephone:",
  ":pager:",
  ":fax:",
  ":tv:",
  ":radio:",
  ":microphone2:",
  ":level_slider:",
  ":control_knobs:",
  ":stopwatch:",
  ":timer:",
  ":alarm_clock:",
  ":clock:",
  ":hourglass:",
  ":hourglass_flowing_sand:",
  ":satellite:",
  ":compass:",
  ":battery:",
  ":electric_plug:",
  ":magnet:",
  ":bulb:",
  ":flashlight:",
  ":candle:",
  ":fire_extinguisher:",
  ":wastebasket:",
  ":oil:",
  ":money_with_wings:",
  ":dollar:",
  ":yen:",
  ":euro:",
  ":pound:",
  ":moneybag:",
  ":credit_card:",
  ":gem:",
  ":nazar_amulet:",
  ":bricks:",
  ":scales:",
  ":toolbox:",
  ":wrench:",
  ":hammer:",
  ":hammer_pick:",
  ":tools:",
  ":pick:",
  ":nut_and_bolt:",
  ":gear:",
  ":chains:",
  ":gun:",
  ":bomb:",
  ":knife:",
  ":dagger:",
  ":crossed_swords:",
  ":shield:",
  ":smoking:",
  ":coffin:",
  ":urn:",
  ":amphora:",
  ":crystal_ball:",
  ":prayer_beads:",
  ":barber:",
  ":alembic:",
  ":test_tube:",
  ":petri_dish:",
  ":dna:",
  ":abacus:",
  ":telescope:",
  ":microscope:",
  ":hole:",
  ":pill:",
  ":syringe:",
  ":thermometer:",
  ":toilet:",
  ":potable_water:",
  ":shower:",
  ":bathtub:",
  ":bath:",
  ":broom:",
  ":basket:",
  ":roll_of_paper:",
  ":soap:",
  ":sponge:",
  ":squeeze_bottle:",
  ":thread:",
  ":yarn:",
  ":bellhop:",
  ":key:",
  ":key2:",
  ":door:",
  ":couch:",
  ":bed:",
  ":sleeping_accommodation:",
  ":teddy_bear:",
  ":frame_photo:",
  ":shopping_bags:",
  ":shopping_cart:",
  ":gift:",
  ":balloon:",
  ":flags:",
  ":ribbon:",
  ":confetti_ball:",
  ":tada:",
  ":dolls:",
  ":izakaya_lantern:",
  ":wind_chime:",
  ":red_envelope:",
  ":envelope:",
  ":envelope_with_arrow:",
  ":incoming_envelope:",
  ":e-mail:",
  ":love_letter:",
  ":inbox_tray:",
  ":outbox_tray:",
  ":package:",
  ":label:",
  ":mailbox_closed:",
  ":mailbox:",
  ":mailbox_with_mail:",
  ":mailbox_with_no_mail:",
  ":postbox:",
  ":postal_horn:",
  ":scroll:",
  ":page_with_curl:",
  ":page_facing_up:",
  ":receipt:",
  ":bookmark_tabs:",
  ":bar_chart:",
  ":chart_with_upwards_trend:",
  ":chart_with_downwards_trend:",
  ":notepad_spiral:",
  ":calendar_spiral:",
  ":calendar:",
  ":date:",
  ":card_index:",
  ":card_box:",
  ":ballot_box:",
  ":file_cabinet:",
  ":clipboard:",
  ":file_folder:",
  ":open_file_folder:",
  ":dividers:",
  ":newspaper2:",
  ":newspaper:",
  ":notebook:",
  ":notebook_with_decorative_cover:",
  ":ledger:",
  ":closed_book:",
  ":green_book:",
  ":blue_book:",
  ":orange_book:",
  ":books:",
  ":book:",
  ":bookmark:",
  ":link:",
  ":paperclip:",
  ":paperclips:",
  ":triangular_ruler:",
  ":straight_ruler:",
  ":safety_pin:",
  ":pushpin:",
  ":round_pushpin:",
  ":scissors:",
  ":pen_ballpoint:",
  ":pen_fountain:",
  ":black_nib:",
  ":paintbrush:",
  ":crayon:",
  ":pencil:",
  ":pencil2:",
  ":mag:",
  ":mag_right:",
  ":lock_with_ink_pen:",
  ":closed_lock_with_key:",
  ":lock:",
  ":unlock:",
  ":heart:",
  ":orange_heart:",
  ":yellow_heart:",
  ":green_heart:",
  ":blue_heart:",
  ":purple_heart:",
  ":black_heart:",
  ":broken_heart:",
  ":heart_exclamation:",
  ":two_hearts:",
  ":revolving_hearts:",
  ":heartbeat:",
  ":heartpulse:",
  ":sparkling_heart:",
  ":cupid:",
  ":gift_heart:",
  ":heart_decoration:",
  ":peace:",
  ":cross:",
  ":star_and_crescent:",
  ":om_symbol:",
  ":wheel_of_dharma:",
  ":star_of_david:",
  ":six_pointed_star:",
  ":menorah:",
  ":yin_yang:",
  ":orthodox_cross:",
  ":place_of_worship:",
  ":ophiuchus:",
  ":aries:",
  ":taurus:",
  ":gemini:",
  ":cancer:",
  ":leo:",
  ":virgo:",
  ":libra:",
  ":scorpius:",
  ":sagittarius:",
  ":capricorn:",
  ":aquarius:",
  ":pisces:",
  ":id:",
  ":atom:",
  ":infinity:",
  ":accept:",
  ":radioactive:",
  ":biohazard:",
  ":mobile_phone_off:",
  ":vibration_mode:",
  ":u6709:",
  ":u7121:",
  ":u7533:",
  ":u55b6:",
  ":u6708:",
  ":eight_pointed_black_star:",
  ":vs:",
  ":white_flower:",
  ":ideograph_advantage:",
  ":secret:",
  ":congratulations:",
  ":u5408:",
  ":u6e80:",
  ":u5272:",
  ":u7981:",
  ":a:",
  ":b:",
  ":ab:",
  ":cl:",
  ":o2:",
  ":sos:",
  ":x:",
  ":o:",
  ":octagonal_sign:",
  ":no_entry:",
  ":name_badge:",
  ":no_entry_sign:",
  ":100:",
  ":anger:",
  ":hotsprings:",
  ":no_pedestrians:",
  ":do_not_litter:",
  ":no_bicycles:",
  ":non-potable_water:",
  ":underage:",
  ":no_mobile_phones:",
  ":no_smoking:",
  ":exclamation:",
  ":grey_exclamation:",
  ":question:",
  ":grey_question:",
  ":bangbang:",
  ":interrobang:",
  ":low_brightness:",
  ":high_brightness:",
  ":part_alternation_mark:",
  ":warning:",
  ":children_crossing:",
  ":trident:",
  ":fleur-de-lis:",
  ":beginner:",
  ":recycle:",
  ":white_check_mark:",
  ":u6307:",
  ":chart:",
  ":sparkle:",
  ":eight_spoked_asterisk:",
  ":negative_squared_cross_mark:",
  ":globe_with_meridians:",
  ":diamond_shape_with_a_dot_inside:",
  ":m:",
  ":cyclone:",
  ":zzz:",
  ":atm:",
  ":wc:",
  ":wheelchair:",
  ":parking:",
  ":u7a7a:",
  ":sa:",
  ":passport_control:",
  ":customs:",
  ":baggage_claim:",
  ":left_luggage:",
  ":mens:",
  ":womens:",
  ":baby_symbol:",
  ":restroom:",
  ":put_litter_in_its_place:",
  ":cinema:",
  ":signal_strength:",
  ":koko:",
  ":symbols:",
  ":information_source:",
  ":abc:",
  ":abcd:",
  ":capital_abcd:",
  ":ng:",
  ":ok:",
  ":up:",
  ":cool:",
  ":new:",
  ":free:",
  ":zero:",
  ":one:",
  ":two:",
  ":three:",
  ":four:",
  ":five:",
  ":six:",
  ":seven:",
  ":eight:",
  ":nine:",
  ":keycap_ten:",
  ":1234:",
  ":hash:",
  ":asterisk:",
  ":eject:",
  ":arrow_forward:",
  ":pause_button:",
  ":play_pause:",
  ":stop_button:",
  ":record_button:",
  ":track_next:",
  ":track_previous:",
  ":fast_forward:",
  ":rewind:",
  ":arrow_double_up:",
  ":arrow_double_down:",
  ":arrow_backward:",
  ":arrow_up_small:",
  ":arrow_down_small:",
  ":arrow_right:",
  ":arrow_left:",
  ":arrow_up:",
  ":arrow_down:",
  ":arrow_upper_right:",
  ":arrow_lower_right:",
  ":arrow_lower_left:",
  ":arrow_upper_left:",
  ":arrow_up_down:",
  ":left_right_arrow:",
  ":arrow_right_hook:",
  ":leftwards_arrow_with_hook:",
  ":arrow_heading_up:",
  ":arrow_heading_down:",
  ":twisted_rightwards_arrows:",
  ":repeat:",
  ":repeat_one:",
  ":arrows_counterclockwise:",
  ":arrows_clockwise:",
  ":musical_note:",
  ":notes:",
  ":heavy_plus_sign:",
  ":heavy_minus_sign:",
  ":heavy_division_sign:",
  ":heavy_multiplication_x:",
  ":heavy_dollar_sign:",
  ":currency_exchange:",
  ":tm:",
  ":copyright:",
  ":registered:",
  ":wavy_dash:",
  ":curly_loop:",
  ":loop:",
  ":end:",
  ":back:",
  ":on:",
  ":top:",
  ":soon:",
  ":heavy_check_mark:",
  ":ballot_box_with_check:",
  ":radio_button:",
  ":white_circle:",
  ":black_circle:",
  ":red_circle:",
  ":blue_circle:",
  ":small_red_triangle:",
  ":small_red_triangle_down:",
  ":small_orange_diamond:",
  ":small_blue_diamond:",
  ":large_orange_diamond:",
  ":large_blue_diamond:",
  ":white_square_button:",
  ":black_square_button:",
  ":black_small_square:",
  ":white_small_square:",
  ":black_medium_small_square:",
  ":white_medium_small_square:",
  ":black_medium_square:",
  ":white_medium_square:",
  ":black_large_square:",
  ":white_large_square:",
  ":speaker:",
  ":mute:",
  ":sound:",
  ":loud_sound:",
  ":bell:",
  ":no_bell:",
  ":mega:",
  ":loudspeaker:",
  ":speech_left:",
  ":eye_in_speech_bubble:",
  ":speech_balloon:",
  ":thought_balloon:",
  ":anger_right:",
  ":spades:",
  ":clubs:",
  ":hearts:",
  ":diamonds:",
  ":black_joker:",
  ":flower_playing_cards:",
  ":mahjong:",
  ":clock1:",
  ":clock2:",
  ":clock3:",
  ":clock4:",
  ":clock5:",
  ":clock6:",
  ":clock7:",
  ":clock8:",
  ":clock9:",
  ":clock10:",
  ":clock11:",
  ":clock12:",
  ":clock130:",
  ":clock230:",
  ":clock330:",
  ":clock430:",
  ":clock530:",
  ":clock630:",
  ":clock730:",
  ":clock830:",
  ":clock930:",
  ":clock1030:",
  ":clock1130:",
  ":clock1230:",
  ":digit_zero:",
  ":digit_one:",
  ":digit_two:",
  ":digit_three:",
  ":digit_four:",
  ":digit_five:",
  ":digit_six:",
  ":digit_seven:",
  ":digit_eight:",
  ":digit_nine:",
  ":pound_symbol:",
  ":asterisk_symbol:",
  ":female_sign:",
  ":male_sign:",
  ":medical_symbol:",
  ":flag_white:",
  ":flag_black:",
  ":checkered_flag:",
  ":triangular_flag_on_post:",
  ":rainbow_flag:",
  ":pirate_flag:",
  ":flag_af:",
  ":flag_ax:",
  ":flag_al:",
  ":flag_dz:",
  ":flag_as:",
  ":flag_ad:",
  ":flag_ao:",
  ":flag_ai:",
  ":flag_aq:",
  ":flag_ag:",
  ":flag_ar:",
  ":flag_am:",
  ":flag_aw:",
  ":flag_au:",
  ":flag_at:",
  ":flag_az:",
  ":flag_bs:",
  ":flag_bh:",
  ":flag_bd:",
  ":flag_bb:",
  ":flag_by:",
  ":flag_be:",
  ":flag_bz:",
  ":flag_bj:",
  ":flag_bm:",
  ":flag_bt:",
  ":flag_bo:",
  ":flag_ba:",
  ":flag_bw:",
  ":flag_br:",
  ":flag_io:",
  ":flag_vg:",
  ":flag_bn:",
  ":flag_bg:",
  ":flag_bf:",
  ":flag_bi:",
  ":flag_kh:",
  ":flag_cm:",
  ":flag_ca:",
  ":flag_ic:",
  ":flag_cv:",
  ":flag_bq:",
  ":flag_ky:",
  ":flag_cf:",
  ":flag_td:",
  ":flag_cl:",
  ":flag_cn:",
  ":flag_cx:",
  ":flag_cc:",
  ":flag_co:",
  ":flag_km:",
  ":flag_cg:",
  ":flag_cd:",
  ":flag_ck:",
  ":flag_cr:",
  ":flag_ci:",
  ":flag_hr:",
  ":flag_cu:",
  ":flag_cw:",
  ":flag_cy:",
  ":flag_cz:",
  ":flag_dk:",
  ":flag_dj:",
  ":flag_dm:",
  ":flag_do:",
  ":flag_ec:",
  ":flag_eg:",
  ":flag_sv:",
  ":flag_gq:",
  ":flag_er:",
  ":flag_ee:",
  ":flag_et:",
  ":flag_eu:",
  ":flag_fk:",
  ":flag_fo:",
  ":flag_fj:",
  ":flag_fi:",
  ":flag_fr:",
  ":flag_gf:",
  ":flag_pf:",
  ":flag_tf:",
  ":flag_ga:",
  ":flag_gm:",
  ":flag_ge:",
  ":flag_de:",
  ":flag_gh:",
  ":flag_gi:",
  ":flag_gr:",
  ":flag_gl:",
  ":flag_gd:",
  ":flag_gp:",
  ":flag_gu:",
  ":flag_gt:",
  ":flag_gg:",
  ":flag_gn:",
  ":flag_gw:",
  ":flag_gy:",
  ":flag_ht:",
  ":flag_hn:",
  ":flag_hk:",
  ":flag_hu:",
  ":flag_is:",
  ":flag_in:",
  ":flag_id:",
  ":flag_ir:",
  ":flag_iq:",
  ":flag_ie:",
  ":flag_im:",
  ":flag_il:",
  ":flag_it:",
  ":flag_jm:",
  ":flag_jp:",
  ":crossed_flags:",
  ":flag_je:",
  ":flag_jo:",
  ":flag_kz:",
  ":flag_ke:",
  ":flag_ki:",
  ":flag_xk:",
  ":flag_kw:",
  ":flag_kg:",
  ":flag_la:",
  ":flag_lv:",
  ":flag_lb:",
  ":flag_ls:",
  ":flag_lr:",
  ":flag_ly:",
  ":flag_li:",
  ":flag_lt:",
  ":flag_lu:",
  ":flag_mo:",
  ":flag_mk:",
  ":flag_mg:",
  ":flag_mw:",
  ":flag_my:",
  ":flag_mv:",
  ":flag_ml:",
  ":flag_mt:",
  ":flag_mh:",
  ":flag_mq:",
  ":flag_mr:",
  ":flag_mu:",
  ":flag_yt:",
  ":flag_mx:",
  ":flag_fm:",
  ":flag_md:",
  ":flag_mc:",
  ":flag_mn:",
  ":flag_me:",
  ":flag_ms:",
  ":flag_ma:",
  ":flag_mz:",
  ":flag_mm:",
  ":flag_na:",
  ":flag_nr:",
  ":flag_np:",
  ":flag_nl:",
  ":flag_nc:",
  ":flag_nz:",
  ":flag_ni:",
  ":flag_ne:",
  ":flag_ng:",
  ":flag_nu:",
  ":flag_nf:",
  ":flag_kp:",
  ":flag_mp:",
  ":flag_no:",
  ":flag_om:",
  ":flag_pk:",
  ":flag_pw:",
  ":flag_ps:",
  ":flag_pa:",
  ":flag_pg:",
  ":flag_py:",
  ":flag_pe:",
  ":flag_ph:",
  ":flag_pn:",
  ":flag_pl:",
  ":flag_pt:",
  ":flag_pr:",
  ":flag_qa:",
  ":flag_re:",
  ":flag_ro:",
  ":flag_ru:",
  ":flag_rw:",
  ":flag_ws:",
  ":flag_sm:",
  ":flag_st:",
  ":flag_sa:",
  ":flag_sn:",
  ":flag_rs:",
  ":flag_sc:",
  ":flag_sl:",
  ":flag_sg:",
  ":flag_sx:",
  ":flag_sk:",
  ":flag_si:",
  ":flag_gs:",
  ":flag_sb:",
  ":flag_so:",
  ":flag_za:",
  ":flag_kr:",
  ":flag_ss:",
  ":flag_es:",
  ":flag_lk:",
  ":flag_bl:",
  ":flag_sh:",
  ":flag_kn:",
  ":flag_lc:",
  ":flag_pm:",
  ":flag_vc:",
  ":flag_sd:",
  ":flag_sr:",
  ":flag_sz:",
  ":flag_se:",
  ":flag_ch:",
  ":flag_sy:",
  ":flag_tw:",
  ":flag_tj:",
  ":flag_tz:",
  ":flag_th:",
  ":flag_tl:",
  ":flag_tg:",
  ":flag_tk:",
  ":flag_to:",
  ":flag_tt:",
  ":flag_tn:",
  ":flag_tr:",
  ":flag_tm:",
  ":flag_tc:",
  ":flag_vi:",
  ":flag_tv:",
  ":flag_ug:",
  ":flag_ua:",
  ":flag_ae:",
  ":flag_gb:",
  ":england:",
  ":scotland:",
  ":wales:",
  ":flag_us:",
  ":flag_uy:",
  ":flag_uz:",
  ":flag_vu:",
  ":flag_va:",
  ":flag_ve:",
  ":flag_vn:",
  ":flag_wf:",
  ":flag_eh:",
  ":flag_ye:",
  ":flag_zm:",
  ":flag_zw:",
  ":flag_ac:",
  ":flag_bv:",
  ":flag_cp:",
  ":flag_ea:",
  ":flag_dg:",
  ":flag_hm:",
  ":flag_mf:",
  ":flag_sj:",
  ":flag_ta:",
  ":flag_um:",
  ":united_nations:",
];

init_socket();
