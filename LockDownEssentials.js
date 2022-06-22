const Order = require("./Order");


const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    ITEMS: Symbol("items"),
    COUNT: Symbol("count"),
    UPSELL: Symbol("upsell"),
    UPSELLCOUNT: Symbol("upsellcount"),
    END: Symbol("end")
});

module.exports = class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.item = "";
        this.upsellItem = "";
        this.sItem1 = 0;
        this.sItem2 = 0;
        this.sItem3 = 0;
        this.sItem4 = 0;
        this.sItem5 = 0;
        this.sItem6 = 0;
        this.supsell1 = 0;
        this.supsell2 = 0;
        this.supsell3 = 0;
        this.supsell4 = 0;
        this.ssFood = "";
        this.nTotal = 0;
        this.sValue = "";
        this.sName = "";
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEMS
                aReturn.push("Welcome to @Curbside Home Hardware");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("1. Broom and Dustbin - $7.34\n2. Snow Shovel - $10.00\n3. Garbage and recycling container - $4.50\n4. Light bulb - $2.00\n5. Household Cleaners - #3.00\n6. Furnace Filters - $1.90\n7. Exit\nPlease enter an option from above.");
                break;
            case OrderState.ITEMS:
                this.item = sInput;
                if ([1, 2, 3, 4, 5, 6].includes(parseInt(sInput))) {
                    aReturn.push("Please enter the number you need: ")
                    this.stateCur = OrderState.COUNT;
                } else if (parseInt(sInput) == 7) {
                    aReturn.push("Would you like any of the below items ? each $2.\n1.Simonize car cover\n2.Geeky headlamps\n3.Earbuds\n4.Descaler for Kettles\n5.Exit\nPlease enter an option from above.");
                    this.stateCur = OrderState.UPSELL;
                } else {
                    aReturn.push("Please enter a valid value");
                }
                break;
            case OrderState.COUNT:
                let count = sInput;
                if (parseInt(count) > 0) {
                    switch (this.item) {
                        case "1":
                            this.sItem1 = parseInt(count);
                            break;
                        case "2":
                            this.sItem2 = parseInt(count);
                            break;
                        case "3":
                            this.sItem3 = parseInt(count);
                            break;
                        case "4":
                            this.sItem4 = parseInt(count);
                            break;
                        case "5":
                            this.sItem5 = parseInt(count);
                            break;
                        case "6":
                            this.sItem6 = parseInt(count);
                            break;
                    }
                    this.stateCur = OrderState.ITEMS
                    aReturn.push("1. Broom and Dustbin - $7.34\n2. Snow Shovel - $10.00\n3. Garbage and recycling container - $4.50\n4. Light bulb - $2.00\n5. Household Cleaners - #3.00\n6. Furnace Filters - $1.90\n7. Exit\nPlease enter an option from above.");
                } else {
                    aReturn.push("Please enter a valid value for count");
                }
                break;
            case OrderState.UPSELL:
                this.item = sInput;
                if ([1, 2, 3, 4].includes(parseInt(sInput))) {
                    aReturn.push("Please enter the number you need: ")
                    this.stateCur = OrderState.UPSELLCOUNT;
                } else if (parseInt(sInput) == 5) {
                    aReturn.push("Please enter your name:");
                    this.stateCur = OrderState.END;
                } else {
                    aReturn.push("Please enter a valid value");
                }
                break;
            case OrderState.UPSELLCOUNT:
                let upsellCount = sInput;
                if (parseInt(upsellCount) > 0) {
                    switch (this.item) {
                        case "1":
                            this.supsell1 = parseInt(upsellCount);
                            break;
                        case "2":
                            this.supsell2 = parseInt(upsellCount);
                            break;
                        case "3":
                            this.supsell3 = parseInt(upsellCount);
                            break;
                        case "4":
                            this.supsell4 = parseInt(upsellCount);
                            break;
                    }
                    this.stateCur = OrderState.UPSELL
                    aReturn.push("1.Simonize car cover\n2.Geeky headlamps\n3.Earbuds\n4.Descaler for Kettles\n5.Exit\nPlease enter an option from above.");
                } else {
                    aReturn.push("Please enter a valid value for count");
                }
                break;
            case OrderState.END:
                this.sName = sInput;
                aReturn.push(`Thank-you ${this.sName} for your order of`);
                this.nTotal = 0;
                if (this.sItem1 > 0) {
                    this.sValue += `Broom and Dustbin - ${this.sItem1}\n`
                    this.nTotal += this.sItem1 * 7.34;
                }
                if (this.sItem2 > 0) {
                    this.sValue += `Snow Shovel - ${this.sItem2}\n`
                    this.nTotal += this.sItem2 * 10;
                }
                if (this.sItem3 > 0) {
                    this.sValue += `Garbage and recycling - ${this.sItem3}\n`
                    this.nTotal += this.sItem3 * 4.50;
                }
                if (this.sItem4 > 0) {
                    this.sValue += `Light bulbs - ${this.sItem4}\n`
                    this.nTotal += this.sItem4 * 2.00;
                }
                if (this.sItem5 > 0) {
                    this.sValue += `Household Cleaners - ${this.sItem5}\n`
                    this.nTotal += this.sItem5 * 3.00;
                }
                if (this.sItem6 > 0) {
                    this.sValue += `Furnace filter - ${this.sItem6}\n`
                    this.nTotal += this.sItem6 * 1.90;
                }
                if (this.supsell1 > 0) {
                    this.sValue += `Simonize car cover - ${this.supsell1}\n`
                    this.nTotal += this.supsell1 * 2;
                }
                if (this.supsel2 > 0) {
                    this.sValue += `Geeky headlamps - ${this.supsel2}\n`
                    this.nTotal += this.supsel2 * 2;
                }
                if (this.supsell3 > 0) {
                    this.sValue += `Earbuds - ${this.supsell3}\n`
                    this.nTotal += this.supsell3 * 2;
                }
                if (this.supsell4 > 0) {
                    this.sValue += `Descaler for Kettles - ${this.supsell4}\n`
                    this.nTotal += this.supsell4 * 2;
                }
                aReturn.push(this.sValue);
                aReturn.push(`Total -  $${this.nTotal.toFixed(2)}`);
                let tax = this.nTotal * 0.13;
                let net = this.nTotal + tax;
                aReturn.push(`Tax $${tax.toFixed(2)}`);
                aReturn.push(`Net amount to be paid\n$${net.toFixed(2)}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm() {
        return (`
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        

        ul.lst-kix_gwmfcm9egwh9-1 {
            list-style-type: none
        }

        ul.lst-kix_gwmfcm9egwh9-4 {
            list-style-type: none
        }

        ul.lst-kix_gwmfcm9egwh9-3 {
            list-style-type: none
        }

        
        ul.lst-kix_gwmfcm9egwh9-6 {
            list-style-type: none
        }

        ul.lst-kix_gwmfcm9egwh9-5 {
            list-style-type: none
        }

        li.li-bullet-0:before {
            margin-left: -18pt;
            white-space: nowrap;
            display: inline-block;
            min-width: 18pt
        }

       
        ul.lst-kix_gwmfcm9egwh9-8 {
            list-style-type: none
        }

        ul.lst-kix_gwmfcm9egwh9-7 {
            list-style-type: none
        }

        ul.lst-kix_gwmfcm9egwh9-0 {
            list-style-type: none
        }

     
       

        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c3 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 177.8pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c1 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 68.2pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c9 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c2 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left;
            height: 11pt
        }

        .c0 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c5 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c13 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c14 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: center
        }

        .c7 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: left
        }

        .c10 {
            border-spacing: 0;
            border-collapse: collapse;
            margin-right: auto
        }

        .c8 {
            background-color: #ffffff;
            max-width: 451.4pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c11 {
            margin-left: 72pt;
            padding-left: 0pt
        }

        .c15 {
            padding: 0;
            margin: 0
        }

        .c4 {
            height: 22.4pt
        }

        .c6 {
            height: 0pt
        }

        .c12 {
            font-weight: 700
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c8">
    <p class="c13"><span>Welcome to </span><span class="c12">Home Hardware @Curbside</span></p>
    <p class="c2"><span class="c0"></span></p>
    <p class="c13"><span class="c0">Now you can buy things needed for your home from your car, quick and easy.</span>
    </p>
    <p class="c2"><span class="c0"></span></p>
    <p class="c5"><span class="c0">Items available to buy:</span></p>
    <p class="c2"><span class="c0"></span></p><a id="t.6c09ec45fb68a8059fd434a1b01acad402dac707"></a><a id="t.0"></a>
    <table class="c10">
        <thead>
            <tr class="c6">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c14"><span class="c9">Item</span></p>
                </td>
                <td class="c1" colspan="1" rowspan="1">
                    <p class="c14"><span class="c9">Unit Price</span></p>
                </td>
        <tbody></tbody>
        </tr>
        <tr class="c6">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">Broom &amp; Dustbin</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">$ 7.34</span></p>
            </td>
        </tr>
        <tr class="c4">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">Snow Shovel</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">$ 10.00</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">Garbage and recycling container</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">$ 4.50</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">Light bulbs</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">$ 2.00</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">Household cleaners</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">$ 3.00</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c3" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">Furnace filters</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
                <p class="c7"><span class="c0">$ 1.90</span></p>
            </td>
        </tr>
        </thead>
    </table>
    <p class="c2"><span class="c0"></span></p>
    <p class="c5"><span class="c0">Some of the specials all are $2 each: </span></p>
    <ul class="c15 lst-kix_gwmfcm9egwh9-0 start">
        <li class="c5 c11 li-bullet-0"><span class="c0">Simonize car cover</span></li>
        <li class="c5 c11 li-bullet-0"><span class="c0">Geeky headlamps</span></li>
        <li class="c5 c11 li-bullet-0"><span class="c0">Earbuds</span></li>
        <li class="c5 c11 li-bullet-0"><span>Descaler for Kettles </span></li>
    </ul>
</body>

</html>
      `);

    }
}