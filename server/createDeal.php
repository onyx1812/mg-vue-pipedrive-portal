<?php
// Content of createDeal.php

// Pipedrive API token
$api_token = '67a36030ab687236cf7250283f5cb55170df2e88';

// Pipedrive company domain
$company_domain = 'purpleadlab';

// Deal title and Organization ID
$deal = array(
  'title' => 'Deal title goes here',
  'org_id' => 123
);

$url = 'https://' . $company_domain . '.pipedrive.com/api/v1/deals?api_token=' . $api_token;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $deal);

echo 'Sending request...' . PHP_EOL;

$output = curl_exec($ch);
curl_close($ch);

// Create an array from the data that is sent back from the API
// As the original content from server is in JSON format, you need to convert it to PHP array
$result = json_decode($output, true);

// Check if an ID came back, if did print it out
if (!empty($result['data']['id'])) {
   echo 'Deal was added successfully!' . PHP_EOL;
}