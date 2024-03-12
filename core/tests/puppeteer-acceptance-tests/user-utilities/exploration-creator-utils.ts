// Copyright 2024 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview exploration management test file
 */

import { BaseUser } from
  '../puppeteer-testing-utilities/puppeteer-utils';
import { showMessage } from
  '../puppeteer-testing-utilities/show-message-utils';
import { error } from 'console';

const creatorDashboardUrl = 'http://localhost:8181/creator-dashboard';
const createNewExplorationButton =
'.e2e-test-create-new-exploration-button';
const takeMeToEditorButton = '.e2e-test-dismiss-welcome-modal';
const addCardName = '.e2e-test-state-name-text';
const introSubmitButton = '.e2e-test-state-name-submit';
const forButtonToBeEnabled =
'.e2e-test-state-name-submit:not([disabled])';
const introTitleSubmitButton = '.e2e-test-save-state-content';
const interactionAddbutton = '.oppia-add-interaction-button';
const endIneractionTab =
'.e2e-test-interaction-tile-EndExploration';
const saveInteractionButton = '.e2e-test-save-interaction';
const settingsTab =
'.nav-link[aria-label="Exploration Setting Button"]';
const addTitleBar = '.e2e-test-exploration-title-input';
const addTitle = '.e2e-test-exploration-title-input';
const addGoalBar = '.e2e-test-exploration-objective-input';
const addGoal = '.e2e-test-exploration-objective-input';
const categoryDropDawn = '.mat-select-arrow-wrapper';
const addCategory = '#mat-option-69';
const languageUpdateBar = '#mat-select-value-9';
const addLanguage = '#mat-option-6';
const addTags = '#mat-chip-list-input-0';
const previewSummaryButton = '.e2e-test-open-preview-summary-modal';
const dismissPreviewButton = '.e2e-test-close-preview-summary-modal';
const textToSpeechToggle = 'label[for="text-speech-switch"]';
const feedbackToggleOff = 'label[for="feedback-switch"]';

const editbutton = '.oppia-edit-roles-btn';
const addUserName = '#newMemberUsername';
const addRoleBar = '#mat-select-value-11';
const collaboratorRoleOption = '#mat-option-62';
const playTesterRoleOption = '#mat-option-63';
const saveRole = '.e2e-test-save-role';
const deleteExplorationButton = '.oppia-delete-button';
const saveDraftButton = '.oppia-save-draft-button';
const publishButton = '.oppia-editor-publish-button';
const discardDraftButton = 'a.e2e-test-discard-changes';
const discardConfirmButton = '.e2e-test-confirm-discard-changes';
const deleteConfirmButton =
'.e2e-test-really-delete-exploration-button';
const voiceArtistEditButton = '.e2e-test-edit-voice-artist-roles';
const voiceArtistSaveButton =
'.e2e-test-add-voice-artist-role-button';
const publishConfirmButton = '.e2e-test-confirm-pre-publication';
const commitMessage = '.e2e-test-commit-message-input';
const closePublishedPopUp = '.e2e-test-share-publish-close';
const addVoiceArtistUserName = '#newVoicAartistUsername';

let explorationUrlAfterPublished = '';
export class ExplorationCreator extends BaseUser {
  /**
   * This function helps in reaching dashboard Url.
   */
  async openCreatorDashboardPage(): Promise<void> {
    await this.goto(creatorDashboardUrl);
  }

  /**
   * This function helps in reaching editor section.
   */
  async switchToEditorTab(): Promise<void> {
    await this.clickOn(createNewExplorationButton);
    await this.clickOn(takeMeToEditorButton);
  }

  /**
   * This function helps in updating Card Name.
   */
  async updateCardName(cardName: string): Promise<void> {
    await this.page.waitForTimeout(500);
    await this.clickOn(addCardName);
    await this.type('.e2e-test-state-name-input', cardName);
    await this.page.waitForSelector(forButtonToBeEnabled);
    await this.clickOn(introSubmitButton);
  }

  /**
   * This function helps in updating exploration intro text.
   */
  async updateExplorationIntroText(Introtext: string): Promise<void> {
    await this.page.waitForTimeout(600);
    await this.clickOn('.e2e-test-edit-content-pencil-button');
    await this.page.waitForSelector('.e2e-test-rte', { visible: true });
    await this.type('.e2e-test-rte', Introtext);
    await this.clickOn(introTitleSubmitButton);
  }

  /**
   * This function helps in adding interaction.
   */
  async addEndInteraction(): Promise<void> {
    await this.clickOn(interactionAddbutton);
    await this.clickOn(endIneractionTab);
    await this.clickOn(saveInteractionButton);
  }

  async showMessageOfSuccessfulExplorationCreation(): Promise<void> {
    showMessage('Successfully created a exploration!');
  }

  /**
   * This function helps in reaching setting tab successfully.
   */
  async goToSettingsTab(): Promise<void> {
    await this.clickOn(settingsTab);
  }

  /**
   * This function helps in updating Title.
   */
  async addTitle(Title: string): Promise<void> {
    await this.clickOn(addTitleBar);
    await this.type(addTitle, Title);
  }

  /**
   * This function checks length of title bar at basic settings tab.
   */
  async expectTitleToHaveMaxLength(maxLength: number): Promise<void> {
    const titleInput = await this.page.$(
      '.e2e-test-exploration-title-input');
    const title = await this.page.evaluate(
      input =>input.value, titleInput);
    const titleLength = title.length;

    if (titleLength <= maxLength) {
      showMessage(
        'Title length is within the' +
        ` allowed limit of ${maxLength} characters.`);
    } else {
      throw new Error(
        'Title length exceeds the allowed' +
        ` limit of ${maxLength} characters.`);
    }
  }

  /**
   * This function helps in adding a goal.
   */
  async updateGoal(goal: string): Promise<void> {
    await this.clickOn(addGoalBar);
    await this.type(addGoal, Goal);
  }

  /**
   * This function checks if the goal has been set in the exploration.
   */
  async expectGoalToEqual(expectedGoal: string): Promise<void> {
    const goalInput = await this.page.$(
      '.e2e-test-exploration-objective-input');
    const goal = await this.page.evaluate(
      input => input.value, goalInput);
    if (goal === expectedGoal) {
      showMessage('The goal has been set for the exploration.');
    } else {
      throw new Error('The goal has not been set for the exploration.');
    }
  }

  /**
   * This function helps in selecting a category from dropdawn.
   */
  async selectAlgebraAsACategory(): Promise<void> {
    await this.clickOn(categoryDropDawn);
    await this.clickOn(addCategory);
  }

  /**
   * This function checks if a category has been selected for the exploration.
   */
  async expectSelectedCategoryToBe(expectedCategory: string): Promise<void> {
    const categoryDropdown = await this.page.$('.mat-select-arrow-wrapper');
    if (!categoryDropdown) {
      throw new Error('Category dropdown not found.');
    }
    await categoryDropdown.click();

    const selectedCategory = await this.page.evaluate(() => {
      return (document.querySelector(
        '#mat-option-69') as HTMLElement).innerText;
    });
    if (selectedCategory === expectedCategory) {
      showMessage(
        `The category ${selectedCategory}` +
        ' is same as expectedCategory.');
    } else {
      throw new Error('Category is not correct.');
    }
    await categoryDropdown.click();
  }

  /**
   * This function helps in selecting language from dropdawn.
   */
  async selectEnglishAsLanguage(): Promise<void> {
    await this.clickOn(languageUpdateBar);
    await this.page.waitForTimeout(500);
    await this.clickOn(addLanguage);
  }

  /**
   *  This function verifies that the selected language is displayed correctly.
   */
  async expectSelectedLanguageToBe(expectedLanguage: string): Promise<void> {
    const languageDropdown = await this.page.$(languageUpdateBar);
    if (!languageDropdown) {
      throw new Error('Category dropdown not found.');
    }
    await languageDropdown.click();

    const selectedLanguage = await this.page.evaluate(() => {
      return (document.querySelector('#mat-option-6') as HTMLElement).innerText;
    });
    if (selectedLanguage === expectedLanguage) {
      showMessage(
        `The language ${selectedLanguage}` +
        ' is same as expectedLanguage.');
    } else {
      throw new Error('Language is not correct.');
    }
  }

  /**
   * This function helps in adding tags.
   */
  async addTags(TagNames: string[]): Promise<void> {
    await this.clickOn(addTags);
    await this.type(addTags, TagNames[0]);
    await this.clickOn('.secondary-info-text');
    await this.type(addTags, TagNames[1]);
    await this.clickOn('.secondary-info-text');
    await this.type(addTags, TagNames[2]);
  }

  async updateSettingsSuccessfully(): Promise<void> {
    showMessage('Successfully updated basic settings!');
  }

  /**
   * This function checks if tags are successfully added.
   */
  async expectTagsToBeAdded(): Promise<void> {
    const tags = await this.page.$$('#mat-chip-list-input-0');
    if (tags.length > 0) {
      showMessage(`${tags.length} tag's added successfully.`);
    } else {
      throw new Error('Tags are not added.');
    }
  }

  /**
   * This function allows you to preview the exploration.
   */
  async previewSummary(): Promise<void> {
    await this.page.waitForSelector(
      '.e2e-test-open-preview-summary-modal:not([disabled])');
    await this.clickOn(previewSummaryButton);
    await this.clickOn(dismissPreviewButton);
    await this.expectPreviewSummaryToBeVisible();
  }

  /**
   * This function verifies that the preview summary is visible.
   */
  async expectPreviewSummaryToBeVisible(): Promise<void> {
    const previewSummary = await this.page.$(
      '.e2e-test-open-preview-summary-modal');
    if (previewSummary) {
      showMessage('Preview summary is visible.');
    } else {
      throw new Error('Preview summary is not visible.');
    }
  }

  /**
   * This function helps in updating advanced settings
   */
  async enableAutomaticTextToSpeech(): Promise<void> {
    await this.clickOn(textToSpeechToggle);

    showMessage('Successfully updated advanced settings!');
  }

  /**
   * This function checks whether the Automatic Text-to-Speech
   * setting is enabled or disabled.
   */
  async expectAutomaticTextToSpeechToBeEnabled(): Promise<void> {
    const autoTTSwitch = await this.page.$('#text-speech-switch');
    const isAutoTTSwitchOn = await this.page.evaluate(
      switchElement => switchElement.checked, autoTTSwitch);
    if (isAutoTTSwitchOn) {
      showMessage('Automatic Text-to-Speech is enabled.');
    } else {
      throw error('Automatic Text-to-Speech is disabled.');
    }
  }

  /**
   * This function helps in assigning role of collaborator to any guest user.
   */
  async assignUserToCollaboratorRole(user1: string): Promise<void> {
    await this.clickOn(editbutton);
    await this.clickOn(addUserName);
    await this.type(addUserName, user1);
    await this.clickOn(addRoleBar);
    await this.clickOn(collaboratorRoleOption);
    await this.clickOn(saveRole);
  }

  /**
   * This function helps in assigning role of Playtester to guest user.
   */
  async assignUserToPlaytesterRole(user2: string): Promise<void> {
    await this.clickOn(editbutton);
    await this.clickOn(addUserName);
    await this.type(addUserName, user2);
    await this.clickOn(addRoleBar);
    await this.clickOn(playTesterRoleOption);
    await this.clickOn(saveRole);
  }

  /**
   *Exception function to verify the setting
   *of the exploration to Public/Private
   */
  async expectExplorationToBePublished(): Promise<void> {
    const publishButton = await this.page.$('.e2e-test-publish-exploration');
    if (publishButton) {
      showMessage(
        'Exploration is set to Private and is not' +
        ' accessible to Oppia users.');
    } else {
      showMessage(
        'Exploration is set to Public and is accessible to Oppia users.');
    }
  }

  /**
   * This function helps in adding voice artist.
   */
  async addVoiceArtist(voiceArtists: string[]): Promise<void> {
    await this.clickOn(voiceArtistEditButton);
    await this.clickOn(addVoiceArtistUserName);
    await this.type(addVoiceArtistUserName, voiceArtists[0]);
    await this.clickOn(voiceArtistSaveButton);

    await this.clickOn(voiceArtistEditButton);
    await this.clickOn(addVoiceArtistUserName);
    await this.type(addVoiceArtistUserName, voiceArtists[1]);
    await this.clickOn(voiceArtistSaveButton);

    await this.clickOn(voiceArtistEditButton);
    await this.clickOn(addVoiceArtistUserName);
    await this.type(addVoiceArtistUserName, voiceArtists[2]);
    await this.clickOn(voiceArtistSaveButton);
  }

  /**
   * This function helps to choose notification type.
   */
  async optInToEmailNotifications(): Promise<void> {
    await this.clickOn(feedbackToggleOff);
  }

  /**
   * Exception function to verify the choice of receiving feedback
   * and suggestion notifications via email
   */
  async expectEmailNotificationToBeActivated(): Promise<void> {
    const input = await this.page.$('input[id="feedback-switch"]');

    if (!input) {
      throw new Error('Feedback switch input element not found.');
    }
    const isChecked = await input.evaluate(
      (input) => (input as HTMLInputElement).checked);

    if (isChecked) {
      showMessage('suggestions notifications via email are enabled.');
    } else {
      showMessage('Feedback notifications via email are enabled.');
    }
  }

  /**
   * This funciton helps in deleting the exploration successfully.
   */
  async deleteExploration(): Promise<void> {
    await this.clickOn(deleteExplorationButton);
    await this.clickOn(deleteConfirmButton);
  }

  /**
   * This function helps in verifying , if exploration is
   * deleted successfully?
   */
  async expectExplorationToBeDeletedSuccessfullyFromCreatorDashboard(
  ): Promise<void> {
    await this.page.waitForTimeout(500);
    try {
      await this.page.goto(explorationUrlAfterPublished);
      throw new Error('Exploration is not deleted successfully.');
    } catch (error) {
      showMessage('Exploration is Successfully deleted.');
    }
  }

  /**
   * This function helps in drafting the exploration.
   */
  async saveDraftExploration(): Promise<void> {
    await this.clickOn(saveDraftButton);
    await this.clickOn(commitMessage);
    await this.type(commitMessage, 'Testing Testing');
    await this.clickOn('.e2e-test-save-draft-button');
  }

  /**
   * This function checks whether changes has been drafted or not.
   */
  async expectExplorationToBeDraftedSuccessfully(): Promise<void> {
    const button = await this.page.$('#tutorialSaveButton');

    if (!button) {
      throw new Error('Save button not found.');
    }

    const isDraftButtonDisabled = await button.evaluate(
      (button) => (button as HTMLButtonElement).disabled);

    if (isDraftButtonDisabled) {
      showMessage('Changes have been successfully drafted.');
    } else {
      throw new Error('Failed to draft changes.');
    }
  }

  /**
   * This function helps in publishing the exploration
   */
  async publishExploration(): Promise<void> {
    await this.saveDraftExploration();
    await this.page.waitForTimeout(500);
    await this.clickOn(publishButton);
    await this.clickOn(publishConfirmButton);
    await this.clickOn('.e2e-test-confirm-publish');
    await this.clickOn(closePublishedPopUp);

    await this.page.waitForTimeout(500);
    explorationUrlAfterPublished = await this.page.url();
  }

  /**
  *This function checks whether the exploration
  *is published successfully or not.
  */
  async expectInteractionOnCreatorDashboard(): Promise<void> {
    try {
      await this.page.goto(explorationUrlAfterPublished);
      showMessage('Exploration is available on creator dashboard.');
    } catch (error) {
      throw new Error('Failed to navigate to the exploration URL.');
    }
  }

  /**
   * This function is discarding the current changes.
   */
  async discardCurrentChanges(): Promise<void> {
    await this.clickOn('.e2e-test-settings-container');
    await this.clickOn('button.e2e-test-save-discard-toggle');
    await this.page.waitForTimeout(500);
    await this.clickOn(discardDraftButton);
    await this.clickOn(discardConfirmButton);

    await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
  }

  /**
  *This function checks whether changes has discarded successfully or not.
  */
  async expectTitleToBe(titleBeforeChanges: string): Promise<void> {
    await this.page.waitForTimeout(400);
    const titleInput = await this.page.$(
      '.e2e-test-exploration-title-input');
    const titleAfterChanges = await this.page.evaluate(
      input =>input.value, titleInput);

    if (titleBeforeChanges === titleAfterChanges) {
      showMessage('Changes have been discarded successfully.');
    } else {
      throw new Error('Failed to discard changes.');
    }
  }
}

export let ExplorationCreatorFactory = (
): ExplorationCreator =>new ExplorationCreator();
