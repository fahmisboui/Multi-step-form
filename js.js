let currentStep = 1;
window.onload = function () {
  changeCurrentStep(currentStep);
  switchPlanDuration(currentDuration);
  setupFormInputListeners();

  document.body.classList.remove('hidden');
};

function changeCurrentStep(step) {
  
  if (step === 2) {
    if (!validateForm()) return;
  }

  currentStep = step;
  changeActiveStepper(currentStep);

  document.getElementById(`step${step}`).classList.remove('hidden');

  for (let i = 1; i <= 5; i++) {
    if (i !== step) {
      const stepElement = document.getElementById(`step${i}`);
      stepElement.classList.add('hidden');
    }
  }

  if (step === 1) {
    document.getElementById('back').classList.add('hidden');
  } else {
    document.getElementById('back').classList.remove('hidden');
  }

  if (step === 2) {
    setUpPlan();
  }

  if (step === 4) {
    calculateTotalPrice();
    document.getElementById('next').innerText = 'Confirm';
  } else {
    document.getElementById('next').innerText = 'Next Step';
  }

  if (step === 5) {
    document.getElementById('navigation').classList.add('hidden');
  } else {
    document.getElementById('navigation').classList.remove('hidden');
  }
}

function changeActiveStepper(step) {
  const steppers = document.querySelectorAll(".sidebar__step");

  if (step === 5) step--;

  for (let i = 0; i < steppers.length; i++) {
    let stepper = steppers[i];

    if (i === step - 1) {
      stepper.classList.add('activeStep');
    } else {
      stepper.classList.remove('activeStep');
    }
  }
}


function validateForm() {

  const formInputs = document.getElementsByName('formInput');
  let isValid = true;

  for (let i = 0; i < formInputs.length; i++) {
    let formInput = formInputs[i];

    if (formInput.value === '') {
      isValid = false;
      formInput.setAttribute('data-error', true);
    } else {
      if (isValid !== false) isValid = true;
    }
  }

  return isValid;
}

function setupFormInputListeners() {
  const formInputs = document.getElementsByName('formInput');

  for (let i = 0; i < formInputs.length; i++) {
    let formInput = formInputs[i];

    formInput.oninput = (e) => {
      if (formInput.value === '') {
        formInput.setAttribute('data-error', true);
      } else {
        formInput.setAttribute('data-error', false);
      }
    };
  }
}

//step 2
let currentDuration = 'monthly';

var selectedPlanDuration = document.getElementById("selectedPlanDuration");
var selectedDuration = document.getElementById("selectedDuration");
var durationSwitchBtn = document.getElementById('durationSwitchBtn');
function DurationSwitch() {
  const currentDuration = durationSwitchBtn.getAttribute('data-selected');

  if (currentDuration === 'monthly') {
    switchPlanDuration('yearly');
    durationSwitchBtn.setAttribute('data-selected', 'yearly');
    selectedPlanDuration.innerText = "Yearly";
    selectedDuration.innerText = "year";
  } else {
    switchPlanDuration('monthly');
    durationSwitchBtn.setAttribute('data-selected', 'monthly');
    selectedPlanDuration.innerText = "Monthly";
    selectedDuration.innerText = "month";
  }
}

function switchPlanDuration(duration) {
  let durationElements;
  let eliminateDurationElements;
  currentDuration = duration;

  if (duration === 'monthly') {
    durationElements = document.querySelectorAll('.monthly');
    eliminateDurationElements = document.querySelectorAll('.yearly');
  } else {
    durationElements = document.querySelectorAll('.yearly');
    eliminateDurationElements = document.querySelectorAll('.monthly');
  }

  for (let i = 0; i < durationElements.length; i++) {
    let element = durationElements[i];
    element.classList.remove('hidden');
  }
  for (let i = 0; i < eliminateDurationElements.length; i++) {
    let element = eliminateDurationElements[i];
    element.classList.add('hidden');
  }
}

let currentPlan = 'Arcade';
let planPrice = 9;

function setUpPlan(){
var plans = document.querySelectorAll("input[name='step2']");

for (let i = 0; i < plans.length; i++) {
  plans[i].addEventListener('click', () =>{
      if(plans[i].checked){
        const selectedPlans = plans[i].value; 
        switch(selectedPlans) {
          case "Arcade":
            console.log("arcade");
            currentPlan = 'Arcade';
            planPrice = 9;
            break;
          case 'Advanced':
            console.log("advanced");
            currentPlan = "Advanced";
            planPrice = 12;
            break;
            case 'Pro':
              console.log("pro");
              currentPlan = "Pro";
              planPrice = 15;
            break;
          }
        }
});
}
}

//step4

function calculateTotalPrice(){
  var selectedPlanCost = document.getElementById('selectedPlanCost');
  var selectedPlan = document.getElementById('selectedPlan');
      selectedPlan.innerText = currentPlan;

        var totalPlanCost;
        var duration;
        
        if (currentPlan === 'Arcade') totalPlanCost = 9;
        else if (currentPlan === 'Advanced') totalPlanCost = 12;
        else totalPlanCost = 15;
        
        if (currentDuration === 'monthly') duration = 'mo';
        else {
          duration = 'yr';
          totalPlanCost *= 10;
        }
        selectedPlanCost.innerText = `+$${totalPlanCost}/${duration}`;



  var selectedAddons = [];
  const addOns = document.getElementsByName('services');

  for (let i = 0; i < addOns.length; i++) {
    let addOn = addOns[i];

    if (addOn.checked){
      selectedAddons.push(addOn.id);
    }
  }

  var selectedAddonsContainer = document.getElementById("selectedAddonsContainer");
  if (selectedAddons.length === 0)
  selectedAddonsContainer.classList.add('hidden');
  else {
    selectedAddonsContainer.classList.remove('hidden');
    var selectedAddOnsList = document.getElementById('selectedAddOnsList');
    selectedAddOnsList.innerHTML = '';

    for (let i = 0; i < selectedAddons.length; i++) {
      let selectedAddon = selectedAddons[i];

      let listItem = document.createElement('li');
      let addOnNameParagraph = document.createElement('p');
      let addOnCostParagraph = document.createElement('p');

      listItem.classList.add('selected_add-on');
      addOnNameParagraph.classList.add('add-on-name');
      addOnCostParagraph.classList.add('add-on-cost');

      let addOnCost;
      if (selectedAddon === 'onlineService') {
        addOnCost = 1;
        if (currentDuration === 'yearly') addOnCost *= 10;

        addOnNameParagraph.innerText = 'Online Service';
      } else if (selectedAddon === 'largerStorage') {
        addOnCost = 2;
        if (currentDuration === 'yearly') addOnCost *= 10;

        addOnNameParagraph.innerText = 'Larger Storage';
      } else {
        addOnCost = 2;
        if (currentDuration === 'yearly') addOnCost *= 10;

        addOnNameParagraph.innerText = 'Customizable Profile';
      }

      addOnCostParagraph.innerText = `+$${addOnCost}/${duration}`;
      listItem.appendChild(addOnNameParagraph);
      listItem.appendChild(addOnCostParagraph);

      selectedAddOnsList.appendChild(listItem);

      totalPlanCost += addOnCost;
    }
  }

  document.getElementById('totalCost').innerText = `+$${totalPlanCost}/${duration}`;
}


