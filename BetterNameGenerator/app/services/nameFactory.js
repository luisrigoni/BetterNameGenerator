﻿
nameApp.factory('nameFactory', function () {

    var factory = {};
    var names = {
        "boys": [
            "Mads",
            "Sayed",
            "Scott",
            "Peter",
            "Todd",
            "Barry"
        ],
        "girls": [
            "Reshmi",
            "Anh",
            "Samantha",
            "Caitlin"
        ],
        "last": [
            "Hashimi",
            "Kristensen",
            "Tang",
            "Grunke",
            "Spada",
            "Hunter"
        ]
    }

    factory.getBetterName = function (gender, name) {
        
        var list = gender == "male" ? names.boys : names.girls;
        var hash = (gender + name.toLowerCase()).hashCode();

        var first = Math.abs(hash % list.length);
        var last = Math.abs(hash % names.last.length);

        return list[first] + " " + names.last[last];
    }

    String.prototype.hashCode = function () {
        var hash = 0;
        if (this.length == 0) return hash;
        for (var i = 0; i < this.length; i++) {
            var character = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    return factory;
});