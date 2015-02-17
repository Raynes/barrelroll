"use 6to5";

import Scraper from "../scraper";
import spooky, {spookyFn} from "../spooky";

class WellsFargoScraper extends Scraper {

  // This must all be as self contained as possible, because the spooky
  // environment is entirely isolated. We're limited in our communication.
  spook(sp) {
    let login = () => {
      let user = this.account.username;
      let pass = this.account.password;

      sp.then(
        spookyFn(function(user, pass) {
          this.fillSelectors("#Signon", {
            'input[name="userid"]': user,
            'input[name="password"]': pass
            }, true);
          }, user, pass)
        );

      // Wait for login to finish.
      sp.waitForUrl('https://online.wellsfargo.com/das/cgi-bin/session.cgi?screenid=SIGNON_PORTAL_PAUSE');
    }

    let getCashAccounts = () => {
      sp.then(function() {
        let s = this.evaluate(() => {
          return $('#cash tbody tr').map(function() {
            title = $(this).find('.account').attr('title');
            return title;
          });
        });

        this.emit('accounts', s);
      });
    }

    sp.start("https://online.wellsfargo.com");

    login();
    getCashAccounts();

    sp.on('accounts', accounts => console.log(accounts));

    sp.run();

  }

  fetchItems() {
    spooky(this.spook.bind(this));
  }
}

export default WellsFargoScraper;
