
<div class="loader">
    <slot/>
</div>

<style>
    .loader {
        position: fixed;
        /*width: 50%;*/
        bottom: 0;
        right: 0;
        margin: 10px;
        display: grid;
        place-items: end;
        z-index: 9999;
    }

    @media screen and (max-width: 525px){
        .loader {
            width: 60%;
        }
    }
</style>