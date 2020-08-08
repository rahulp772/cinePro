$(".download-quality").click( function (x){
    var index = $(".download-quality").index(this);
    $(".download-quality").removeClass("selected");
    x.currentTarget.classList.add("selected");
    for (let i = 0; i < $(".quality-details-all").length; i++) {
        $(".quality-details-all")[i].classList.add("hidden");
    }
    $(".quality-details-all")[index].classList.remove("hidden");
  });
