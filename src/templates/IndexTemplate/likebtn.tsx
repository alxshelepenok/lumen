import React, { useEffect } from "react";

const likebtn = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.getElementById("likebtn_wjs")) return;
      const a = document.createElement("script");
      const m = document.getElementsByTagName("script")[0];
      a.async = 1;
      a.id = "likebtn_wjs";
      a.src = "//w.likebtn.com/js/w/widget.js";
      m.parentNode.insertBefore(a, m);
    });
  }, []);

  return null;
};

export default likebtn;
