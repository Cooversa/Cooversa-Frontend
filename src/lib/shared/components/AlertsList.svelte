
<div class="loader">
    <slot/>
</div>

<style>
    .loader {
        position: fixed;
        width: 50%;
        bottom: 0;
        right: 0;
        margin: 50px;
        display: grid;
        place-items: center;
        z-index: 9999;
    }

    @media screen and (max-width: 525px){
        .loader {
            width: 60%;
        }
    }
</style>