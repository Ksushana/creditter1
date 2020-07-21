import tabsInit from './tabs';
import sidebarInit from './sidebar';
import topAreaInit from './top-area';
import accordionInit from './accordion';
import tooltipInit from './tooltip';
import slidersInit from './sliders';
import customSelectMultipleInit from './custom-select-multiple';
import homeInit from './pages/home';
import stepInit from './pages/step';
import newsInit from './pages/news';
import disclosureInit from './pages/disclosure';
import loyaltyInit from './pages/loyalty';
import howInit from './pages/how';
import partnerInit from './pages/partner';
import faqInit from './pages/faq';
import contactsInit from './pages/contacts';
import lkTableInit from './lk-table';
import lkDropdownInit from './lk-dropdown';
import repaymentInit from './pages/repayment';
import loansHistoryInit from './pages/loans-history';
import profileInit from './pages/profile';
import newTicketInit from './pages/new-ticket';
import paymentDetailsInit from './pages/payment-details';
import lkLoyaltyInit from './pages/lk-loyalty';
import affiliateInit from './pages/affiliate';
import statisticsInit from './pages/statistics';

document.addEventListener('DOMContentLoaded', () => {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    tabsInit();
    sidebarInit();
    topAreaInit();
    accordionInit();
    tooltipInit();
    slidersInit();
    customSelectMultipleInit();
    homeInit();
    stepInit();
    newsInit();
    disclosureInit();
    howInit();
    loyaltyInit();
    partnerInit();
    faqInit();
    contactsInit();
    lkTableInit();
    lkDropdownInit();
    repaymentInit();
    loansHistoryInit();
    profileInit();
    newTicketInit();
    paymentDetailsInit();
    lkLoyaltyInit();
    affiliateInit();
    statisticsInit();
  }
});
